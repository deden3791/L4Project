import React, { useState, useEffect } from 'react';
import "../styles/styles.css";
import { useSound } from 'use-sound';

const AudioCapturePlayback = () => {
  const [isAudioPlaying, setIsPlaying] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);

  const audioContext = new AudioContext();
  const destination = audioContext.destination;
  let microphoneSourceNode: MediaStreamAudioSourceNode | null = null;

  const handlePlayAudio = async () => {
    try {
      if (!isAudioPlaying) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneStream(stream);
        microphoneSourceNode = audioContext.createMediaStreamSource(stream);
        microphoneSourceNode.connect(destination);
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
    </div>
  );
};

export default AudioCapturePlayback;