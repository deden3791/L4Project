import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import "../styles/styles.css"
import TextToSpeech from '../components/TextToSpeech';
import AudioCapturePlayback from '../components/AudioPlayback';

// let host = new Host();

const HomePage = () => {

  // const navigate = useNavigate();
  // const handleClick = () => navigate('/captions');

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  }
  const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
      return null
  }

  return (
    <div>
      <Header title="Earbud Controller" showBackButton={false}/>
      <div className='pageBody'>
        <p className='small-text'>Listening: {listening ? 'on' : 'off'}</p>
        
        <div className='transcript-box'>
            <div className='transcript-text'>
                {transcript}
            </div>
        </div>

        <div className="button-container">
            <button className="small-button" onClick={startListening}>Start Listening</button>
            <button className="small-button" onClick={SpeechRecognition.stopListening}>Stop Listening</button>
            <button className="small-button" onClick={resetTranscript}>Reset</button>
        </div>
        
        <TextToSpeech text={transcript} />

        <AudioCapturePlayback />
      </div>
    </div>
  );
};

export default HomePage;