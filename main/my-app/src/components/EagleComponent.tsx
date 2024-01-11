import React, { useEffect, useState } from 'react';
import { EagleProfilerEnrollFeedback } from "@picovoice/eagle-web";
import { WebVoiceProcessor } from '@picovoice/web-voice-processor';

const EagleMicrophone: React.FC = () => {
  const [profiler, setProfiler] = useState<any>(null);
  const [speakerProfiles, setSpeakerProfiles] = useState<any[]>([]);
  const [timer, setTimer] = useState<any>(null);
  const [currentTimer, setCurrentTimer] = useState<number>(0.0);
  const [audioData, setAudioData] = useState<number[][]>([]);
  const [dumpAudio, setDumpAudio] = useState<number[]>([]);
  const [enableAudioDump] = useState<boolean>(false);
  const [displayTimerVisible, setDisplayTimerVisible] = useState<boolean>(false);
  const [micEnrollStartBtnVisible, setMicEnrollStartBtnVisible] = useState<boolean>(true);
  const [audioFileDisabled, setAudioFileDisabled] = useState<boolean>(false);
  const [micEnrollStopBtnVisible, setMicEnrollStopBtnVisible] = useState<boolean>(false);
  const [testContainerVisible, setTestContainerVisible] = useState<boolean>(false);
  const [feedbackTextContent, setFeedbackTextContent] = useState<string>('');
  const [speakersTableContent, setSpeakersTableContent] = useState<JSX.Element[]>([]);
  const [testStartBtnDisabled, setTestStartBtnDisabled] = useState<boolean>(true);
  const [resetBtnDisabled, setResetBtnDisabled] = useState<boolean>(true);
  const [displayTimerText, setDisplayTimerText] = useState('0.0');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  interface SpeakerProps {
    speakerId: number;
    feedback: number;
    progress: number;
  }

  const initializeAudioContext = async () => {
    try {
      const context = new (window.AudioContext)({
        sampleRate: 16000,
      });
      setAudioContext(context);
    } catch (error) {
      console.error('Failed to initialize AudioContext:', error);
    }
  };

  const micEnrollEngine = {
    onmessage: async (event: any) => {
      switch (event.data.command) {
        case "process":
          setAudioData((prevAudioData) => prevAudioData.concat(event.data.inputFrame));

          if (enableAudioDump) {
            setDumpAudio((prevDumpAudio) => prevDumpAudio.concat(event.data.inputFrame));
          }

          if (audioData.length * 512 >= (profiler?.minEnrollSamples || 0)) {
            let result;
            try {
              const frames = new Int16Array(audioData.length * 512);
              for (let i = 0; i < audioData.length; i++) {
                frames.set(audioData[i], i * 512);
              }
              setAudioData([]);
              result = await profiler.enroll(frames);
            } catch (e) {
              console.log(`Failed to enroll. Error: ${e}`);
              return;
            }

            updateSpeakerProgress(speakerProfiles.length + 1, result.feedback, result.percentage);
            if (result.percentage === 100) {
              // Logic to handle completion of enrollment
              // ...
            }
          }
          break;
        default:
          break;
      }
    }
  };

  const updateSpeakerProgress = (speakerId: number, feedback: number, progress: number) => {
    const getFeedbackMessage = (feedback: number): string => {
      switch (feedback) {
        case EagleProfilerEnrollFeedback.AUDIO_TOO_SHORT:
          return "Insufficient audio length";
        case EagleProfilerEnrollFeedback.UNKNOWN_SPEAKER:
          return "Different speaker detected in audio";
        case EagleProfilerEnrollFeedback.NO_VOICE_FOUND:
          return "Unable to detect voice in audio";
        case EagleProfilerEnrollFeedback.QUALITY_ISSUE:
          return "Audio quality too low to use for enrollment";
        default:
          return "Enrolling speaker...";
      }
    };
  };

  const micEnrollStart = async () => {
    setCurrentTimer(0.0);
    setAudioData([]);
    micEnrollStartUI();
    newEnrollmentUI();
    try {
      await profiler.reset();
    } catch (e) {
      console.log(`Failed to reset Eagle Profiler. Error: ${e}`);
      return;
    }

    console.log("Keep speaking continuously until enrollment progress reaches 100%.");
    try {
      await WebVoiceProcessor.subscribe(micEnrollEngine);
      const newTimer = setInterval(() => {
        setCurrentTimer((prevTimer) => prevTimer + 0.1);
        const displayTimer = document.getElementById("displayTimer");
        if (displayTimer) {
          displayTimer.innerText = `${currentTimer.toFixed(1)}`;
        }
      }, 100);
      setTimer(newTimer);
    } catch (e) {
      console.log(e);
    }
  };

  const micEnrollStop = async () => {
    if (timer) {
      clearInterval(timer);
    }
    await WebVoiceProcessor.unsubscribe(micEnrollEngine);
    console.log(`Enrollment stopped`);
    updateSpeakerTable();
    enrollFailUI();
    micEnrollStopUI();
  };

  const micEnrollStartUI = () => {
    setDisplayTimerVisible(true);
    setMicEnrollStartBtnVisible(false);
    setAudioFileDisabled(true);
    setMicEnrollStopBtnVisible(true);
  };

  const createSpeakerRow = (speakerId: number, initialProgress: number): JSX.Element => {
    return (
      <div key={`speaker-${speakerId}`}>
        Speaker {speakerId} 
        <progress max={100} value={initialProgress}></progress>
        <span id={`speaker${speakerId}Feedback`}></span>
      </div>
    );
  };

  const updateSpeakerTable = () => {
    const speakerRows: JSX.Element[] = [];
    for (let i = 0; i < speakerProfiles.length; i++) {
      const newSpeakerRow = createSpeakerRow(i + 1, speakerProfiles[i].percentage);
      speakerRows.push(newSpeakerRow);
      speakerRows.push(<br key={`br-${i}`} />);
    }
    setSpeakersTableContent(speakerRows);
  };

  const newEnrollmentUI = () => {
    updateSpeakerTable();
    setTestContainerVisible(true);
    setFeedbackTextContent('');
    const newSpeakerRow = createSpeakerRow(speakerProfiles.length + 1, 0);
    setSpeakersTableContent([...speakersTableContent, newSpeakerRow, <br key="br" />]);
    setTestStartBtnDisabled(true);
    setResetBtnDisabled(true);
  };

  const enrollFailUI = () => {
    const startBtnDisabled = speakerProfiles.length === 0;
    const resetBtnDisabled = speakerProfiles.length === 0;

    return (
      <div>
        <button disabled={startBtnDisabled}>Start</button>
        <button disabled={resetBtnDisabled}>Reset</button>
      </div>
    );
  };

  const micEnrollStopUI = () => {
    setDisplayTimerVisible(false);
    setMicEnrollStartBtnVisible(true);
    setAudioFileDisabled(false);
    setMicEnrollStopBtnVisible(false);
    setDisplayTimerText('0.0');
  };

  useEffect(() => {
    let currentTimer = 0.0;

    initializeAudioContext();

    document.getElementById("micEnrollStartBtn")?.addEventListener("click", micEnrollStart);
    document.getElementById("micEnrollStopBtn")?.addEventListener("click", micEnrollStop);

    return () => {
      document.getElementById("micEnrollStartBtn")?.removeEventListener("click", micEnrollStart);
      document.getElementById("micEnrollStopBtn")?.removeEventListener("click", micEnrollStop);
    };
  }, []);

  return (
    <div>
      <label htmlFor="micEnrollStartBtn" className='small-text'>Enroll speaker with microphone:</label>
      <button className='small-button' onClick={micEnrollStart} id="micEnrollStartBtn">
        Record Audio
      </button>
      <button onClick={micEnrollStop} id="micEnrollStopBtn" style={{ display: 'none' }}>
        Stop Enrollment
      </button>
      <span id="displayTimer" style={{ display: 'none' }}></span>
      {/* Other JSX elements for the microphone enrollment section */}
    </div>
  );
};

export default EagleMicrophone;
