import React, { useState } from 'react';
import "../styles/styles.css";

const AudioCapturePlayback = () => {
  const [isAudioPlaying, setIsPlaying] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [microphoneSourceNode, setMicrophoneSourceNode] = useState<MediaStreamAudioSourceNode | null>(null);

  const handlePlayAudio = async () => {
    try {
      if (!isAudioPlaying) {
        const audioContext = new AudioContext();
        if (audioContext === null) {
          setAudioContext(new AudioContext());
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneStream(stream);
        setAudioContext(audioContext);

        const sourceNode = audioContext.createMediaStreamSource(stream);
        setMicrophoneSourceNode(sourceNode);

        // Connect the microphone source to the destination
        sourceNode.connect(audioContext.destination);
      } else {
        if (microphoneSourceNode) {
          microphoneSourceNode.disconnect();
          setMicrophoneSourceNode(null);
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
