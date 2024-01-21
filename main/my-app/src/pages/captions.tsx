import { useState } from 'react';
import "../styles/styles.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../styles/styles.css";
import TextToSpeech from '../components/TextToSpeech';
import AudioCapturePlayback from '../components/AudioPlayback';
import AudioAnalysis from '../components/AudioAnalysis'
import EnrollmentComponent from '../components/EagleComponent';

const CaptionsPage = () => {
  
  const [listening, setListening] = useState(false);
  const [textSize, setTextSize] = useState<string>('medium');

  const textAreaStyle = {
    border: '2px solid',
    borderColor: '#c49175',
    borderRadius: '30px',
    height: '255px',
    width: '718px',
    padding: '1%',
    fontFamily: '"Gothic A1-Bold", Helvetica',
    fontSize: textSize === 'small' ? '18px' : (textSize === 'medium' ? '22px' : '26px'),
    fontWeight: '700',
    letterSpacing: '0',
    color: '#c49175',
  };

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
      <p className='big-text'>Speech-to-text</p>
      <p className='small-text'>Listening: {listening ? 'on' : 'off'}</p>
      
      <textarea
        className='text-box'
        value={transcript}
        placeholder='Waiting for speech'
        style={textAreaStyle}
      />

      <div className="button-container">
        <button className="small-button" onClick={toggleListening}>
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button className="small-button" onClick={resetTranscript}>Reset</button>
        <label className='big-text'>Text size:
          <select value={textSize} onChange={(event) => setTextSize(event.target.value)} className="small-button">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>

      <div className='row'>
        <TextToSpeech text={transcript} />
        <AudioCapturePlayback text={transcript} />
      </div>

      <EnrollmentComponent />
      <AudioAnalysis /> 
    </div>
  );
};

export default CaptionsPage;