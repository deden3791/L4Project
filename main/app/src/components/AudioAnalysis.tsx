import React, { Component, useState, useEffect } from 'react';
import PopupAlert from './PopupAlert';
import soundfile from '../audios/UKAmbulance.mp3';
import Sound from 'react-sound';

const AudioAnalysisApp = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const analyzeAudio = async () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioData = await soundfile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(audioData);

      const analyser = audioContext.createAnalyser();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      source.start(0);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const duration = audioBuffer.duration;

      console.log(duration, dataArray, bufferLength);
    };

    analyzeAudio();
  }, []);

  return (
    <div>
      <button onClick={togglePopup}>
      </button>
      {showPopup && <PopupAlert onClose={togglePopup} />}
    </div>
  );
};

export default AudioAnalysisApp;
