import React, { useState, useEffect } from 'react';
import "../styles/styles.css";

const AudioCapturePlayback = () => {
  const [isAudioPlaying, setIsPlaying] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [microphoneSourceNode, setMicrophoneSourceNode] = useState<MediaStreamAudioSourceNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [filterNode, setFilterNode] = useState<BiquadFilterNode | null>(null);
  const [volume, setVolume] = useState(2.0);

  useEffect(() => {
    if (audioContext) {
      if (gainNode) {
        gainNode.gain.value = volume;
      }
    }
  }, [audioContext, gainNode, volume]);

  const handleVolumeChange = (event: any) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const handlePlayAudio = async () => {
    try {
      if (!isAudioPlaying) {
        const context = new AudioContext();
        setAudioContext(context);

        const gain = context.createGain();
        setGainNode(gain);

        const filter = context.createBiquadFilter(); 
        // apply low-pass filtering to the audio data before it is played back 
        // example of DSP processing
        filter.type = 'lowpass';
        filter.frequency.value = 5000;
        setFilterNode(filter);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneStream(stream);

        const sourceNode = context.createMediaStreamSource(stream);
        setMicrophoneSourceNode(sourceNode);

        sourceNode.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);
      } else {
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
        if (gainNode) {
          gainNode.disconnect();
          setGainNode(null);
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
      <div className="button-container">
        <button className="small-button" onClick={handlePlayAudio}>
          {isAudioPlaying ? 'Stop Microphone' : 'Start Microphone'}
        </button>
      </div>

      <div className="controls">
        <label className='small-text'>Volume: </label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioCapturePlayback;
