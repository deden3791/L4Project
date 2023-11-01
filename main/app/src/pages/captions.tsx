import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import withLayout from './layout';
import "../styles/styles.css"
import TextToSpeech from '../components/TextToSpeech';


const CaptionsPage = () => {

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
        <>
            <div className="pageBody">
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                
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

            </div>

        </>
    );
};

export default withLayout(CaptionsPage, "Speech to Text Converter", true);