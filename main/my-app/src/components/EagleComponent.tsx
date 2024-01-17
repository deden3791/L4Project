import React, { useState, useEffect } from 'react';
import { EagleProfiler, EagleProfilerEnrollFeedback, EagleProfilerWorker, EagleProfilerEnrollResult, EagleProfile } from '@picovoice/eagle-web';

const EnrollmentComponent = () => {
  const [eagleProfiler, setEagleProfiler] = useState<EagleProfiler | any>(null);
  const [enrollmentPercentage, setEnrollmentPercentage] = useState<number>(0);

  useEffect(() => {
    const initializeEagleProfiler = async () => {
      try {
        const eagleModel = {
          // publicPath: process.env.PUBLIC_URL + "/eagle_params.pv",
          publicPath: "../assets/eagle_params.pv",
          // or
          // base64: ${MODEL_BASE64_STRING},
        };

        const accessKey = 'cx7LHaBXZPLMRWspgKUMhcNbWM+miQSQB8M4HsBi6BxWufk0GWkoQw==';
        const profiler = await EagleProfiler.create(accessKey, eagleModel);

        setEagleProfiler(profiler);
      } catch (error) {
        console.error('Error initializing EagleProfiler:', error);
      }
    };

    initializeEagleProfiler();

    return () => {
      if (eagleProfiler) {
        eagleProfiler.release();
      }
    };
  }, []);

  const getAudioData = async (numSamples: any) => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
    const audioContext = new (window.AudioContext)();
  
    const sourceNode = audioContext.createMediaStreamSource(mediaStream);
  
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
  
    sourceNode.connect(analyserNode);
  
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    analyserNode.getByteTimeDomainData(dataArray);
  
    mediaStream.getTracks().forEach(track => track.stop());
  
    return new Int16Array(dataArray);
  };

  const enrollUser = async () => {
    if (!eagleProfiler) {
      console.error('EagleProfiler not initialized');
      return;
    }

    let percentage = 0;

    while (percentage < 100) {
      const audioData = getAudioData(eagleProfiler.minEnrollSamples);

      try {
        const result: EagleProfilerEnrollResult = await eagleProfiler.enroll(audioData);

        if (result.feedback === EagleProfilerEnrollFeedback.AUDIO_OK) {
          // Audio is good!
        } else {
          // Handle feedback code to determine why audio was not used in enrollment
        }

        percentage = result.percentage;
        setEnrollmentPercentage(percentage);
      } catch (error) {
        console.error('Error during enrollment:', error);
        // Handle error during enrollment
        break;
      }
    }

    // Enrollment complete
    const speakerProfile: EagleProfile = eagleProfiler.export();
    console.log('Speaker profile created:', speakerProfile);
  };

  return (
    <div>
      <h2 className='big-text'>Enrollment Component</h2>
      <p className='small-text'>Enrollment Progress: {enrollmentPercentage}%</p>
      <button className="small-button" onClick={enrollUser}>Start Enrollment</button>
    </div>
  );
};

export default EnrollmentComponent;