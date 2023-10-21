import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import withLayout from './layout';
import "../styles/App.css"
import TextToSpeech from '../classes/TextToSpeech';

const connect = async () => {
    const device = await navigator.bluetooth.requestDevice();
    const server = await device.gatt?.connect();
  };


const CaptionsPage = () => {
    // const [textToCopy, setTextToCopy] = useState();
    // const [isCopied, setCopied] = useClipboard(textToCopy, {
    //     successDuration:1000
    // });

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        console.log(SpeechRecognition.startListening);
        console.log(SpeechRecognition.getRecognition);
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

                    {/* <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button> */}
                    
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