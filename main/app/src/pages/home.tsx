import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../styles/styles.css";
import TextToSpeech from '../components/TextToSpeech';
import AudioCapturePlayback from '../components/AudioPlayback';
import AudioAnalysis from '../components/AudioAnalysis'

const HomePage = () => {

  const navigate = useNavigate();
  const handleClick = () => navigate('/captions');
  
  const [listening, setListening] = useState(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      setListening(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <Header title="Earbud Controller" showBackButton={false} />
      <div className='pageBody'>
        <p className='small-text'>Listening: {listening ? 'on' : 'off'}</p>

        <div className='transcript-box'>
          <div className='transcript-text'>
            {transcript}
          </div>
        </div>

        <div className="button-container">
          <button className="small-button" onClick={toggleListening}>
            {listening ? 'Stop Listening' : 'Start Listening'}
          </button>
          <button className="small-button" onClick={resetTranscript}>Reset</button>
        </div>

        <TextToSpeech text={transcript} />

        <AudioCapturePlayback />
        <AudioAnalysis />
      </div>
    </div>
  );
};

export default HomePage;