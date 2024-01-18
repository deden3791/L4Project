import React, { useState, useEffect } from 'react';
import "../styles/styles.css";
import { useUser } from "@clerk/clerk-react";
import Save from './save'; 

const AudioCapturePlayback = () => {
  const [isAudioPlaying, setIsPlaying] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [microphoneSourceNode, setMicrophoneSourceNode] = useState<MediaStreamAudioSourceNode | null>(null);
  const [filterType, setFilterType] = useState<BiquadFilterType>('lowpass');
  const [gain, setGain] = useState(1.0);
  const [QValue, setQValue] = useState(1.0);
  const [frequency, setFrequency] = useState(1000);
  const [filterNode, setFilterNode] = useState<BiquadFilterNode | null>(null);
  const { user } = useUser();
  const [showSave, setShowSave] = useState(false);
  const [savedSetting, setSavedSetting] = useState<string>('');
  const [selectedSetting, setSelectedSetting] = useState({
    frequency: '',
    Q: '',
    gain: '',
  } as { frequency: string; Q: string; gain: string });
  const [inputValues, setInputValues] = useState({
    frequency: '',
    Q: '',
    gain: '',
  });

  useEffect(() => {
    if (audioContext && filterNode) {
      filterNode.type = filterType;
      filterNode.frequency.value = frequency;
      filterNode.Q.value = QValue;
      filterNode.gain.value = gain;
    }
  }, [audioContext, filterNode, filterType, frequency, QValue, gain]);

  useEffect(() => {
    if (user?.unsafeMetadata && savedSetting) {
      const selectedMetadata = user.unsafeMetadata[savedSetting] as {
        frequency: string;
        Q: string;
        gain: string;
      };
      setInputValues(selectedMetadata || { frequency: '', Q: '', gain: '' });
    }
  }, [savedSetting, user?.unsafeMetadata]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as BiquadFilterType;
    setFilterType(selectedFilter);
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequency = parseFloat(event.target.value);
    setInputValues((prevValues: any) => ({ ...prevValues, frequency: newFrequency }));
  };
  
  const handleQChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQValue = parseFloat(event.target.value);
    setInputValues((prevValues: any) => ({ ...prevValues, Q: newQValue }));
  };
  
  const handleGainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGain = parseFloat(event.target.value);
    setInputValues((prevValues: any) => ({ ...prevValues, gain: newGain }));
  };

  const handlePlayAudio = async () => {
    try {
      if (!isAudioPlaying) {
        const context = new AudioContext();
        setAudioContext(context);
  
        const filter = context.createBiquadFilter();
        filter.type = filterType; // set filter type
  
        // Set filter parameters
        filter.frequency.value = frequency; // Set cutoff frequency
        filter.Q.value = QValue; // Set Q factor
        filter.gain.value = gain; // Set gain
  
        setFilterNode(filter);
  
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneStream(stream);
  
        const sourceNode = context.createMediaStreamSource(stream);
        setMicrophoneSourceNode(sourceNode);
  
        sourceNode.connect(filter);
        filter.connect(context.destination); // Connect filter to audio destination
      } else {
        // Disconnect nodes and stop stream
        if (microphoneSourceNode) {
          microphoneSourceNode.disconnect();
        }
        if (microphoneStream) {
          microphoneStream.getTracks().forEach((track) => {
            track.stop();
          });
          setMicrophoneStream(null);
        }
        if (audioContext) {
          audioContext.close();
          setAudioContext(null);
        }
        if (filterNode) {
          filterNode.disconnect();
          setFilterNode(null);
        }
      }
      setIsPlaying(!isAudioPlaying);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };

  const toggleSave = () => {
    setShowSave(!showSave);
  };

  return (
    <div>
      <p className="big-text">Audio Playback:</p>
      <button className="small-button" onClick={handlePlayAudio}>
        {isAudioPlaying ? 'Stop Microphone' : 'Start Microphone'}
      </button>
      <br />
      <label className='small-text'>
        Filter Type:
        <select value={filterType} onChange={handleFilterChange} className="small-button">
          <option value="lowpass">Low-pass</option>
          <option value="highpass">High-pass</option>
          <option value="bandpass">Band-pass</option>
          <option value="notch">Notch</option>
          <option value="peaking">Peaking</option>
        </select>
      </label>
      <br />
      <label className='small-text'>
        Frequency:
        <input
          type="range"
          id="frequency"
          name="frequency"
          min="100"
          max="20000"
          step="100"
          value={inputValues.frequency === '' ? frequency : inputValues.frequency}
          onChange={handleFrequencyChange}
        />
        <text>{inputValues.frequency === '' ? frequency : inputValues.frequency}</text>
      </label>
      <br />
      <label className='small-text'>
        Q:
        <input
          type="range"
          id="Q"
          name="Q"
          min="0.1"
          max="10"
          step="0.1"
          value={inputValues.Q === '' ? QValue : inputValues.Q}
          onChange={handleQChange}
        />
        <text>{inputValues.Q === '' ? QValue : inputValues.Q}</text>
      </label>
      <br />
      <label className='small-text'>
        Gain:
        <input
          type="range"
          id="gain"
          name="gain"
          min="0"
          max="2"
          step="0.1"
          value={inputValues.gain === '' ? gain : inputValues.gain}
          onChange={handleGainChange}
        />
        <text>{inputValues.gain === '' ? gain : inputValues.gain}</text>
      </label>
      <br />
      <label className='small-text'>
        Saved settings:
        <select
          value={savedSetting}
          onChange={(event) => setSavedSetting(event.target.value)}
          className="small-button"
        >
          {user?.unsafeMetadata &&
            Object.keys(user.unsafeMetadata).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      </label>
      <br />
      <button className='small-button' onClick={toggleSave}>Save</button>
      {showSave && <Save onClose={toggleSave} frequency={inputValues.frequency} gain={inputValues.gain} Q={inputValues.Q} />}
    </div>
  );
};

export default AudioCapturePlayback;
