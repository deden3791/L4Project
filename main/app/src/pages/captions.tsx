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

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
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
            <div className="container">
                <p>Microphone: {listening ? 'on' : 'off'}</p>

                <div className="main-content">
                    {transcript}
                </div>

                <div className="btn-style">

                    {/* <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button> */}
                    
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button onClick={resetTranscript}>Reset</button>
                    <TextToSpeech text={transcript} />

                </div>

            </div>

        </>
    );
};

export default withLayout(CaptionsPage, "Speech to Text Converter", true);