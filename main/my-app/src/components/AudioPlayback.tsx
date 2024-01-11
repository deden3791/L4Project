import React, { useState, useEffect } from 'react';
import "../styles/styles.css";

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
  const [volume, setVolume] = useState(2.0);

  useEffect(() => {
    if (audioContext && filterNode) {
      filterNode.type = filterType;
      filterNode.frequency.value = frequency;
      filterNode.Q.value = QValue;
      filterNode.gain.value = gain;
    }
  }, [audioContext, filterNode, filterType, frequency, QValue, gain]);  
   
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as BiquadFilterType;
    setFilterType(selectedFilter);
  };

  const handleGainChange = (event: any) => {
    const newGain = parseFloat(event.target.value);
    setGain(newGain);
  };
  const handleFrequencyChange = (event: any) => {
    const newFrequency = parseFloat(event.target.value);
    setFrequency(newFrequency);
  };
  const handleQChange = (event: any) => {
    const newQValue = parseFloat(event.target.value);
    setQValue(newQValue);
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

  return (
    <div>
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
          id="freuqncy"
          name="frequency"
          min="100"
          max="20000"
          step="100"
          value={frequency}
          onChange={handleFrequencyChange}
        />
      </label><text>{frequency}</text>
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
          value={QValue}
          onChange={handleQChange}
        />
      </label><text>{QValue}</text>
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
          value={gain}
          onChange={handleGainChange}
        />
      </label><text>{gain}</text>
    </div>
  );
};

export default AudioCapturePlayback;
