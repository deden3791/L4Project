import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import "./App.css"
import TextToSpeech from './TextToSpeech';

const connect = async () => {
    const device = await navigator.bluetooth.requestDevice();
    const server = await device.gatt?.connect();
  };


const App = () => {
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
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div className="main-content">
                    {transcript}
                </div>

                <div className="btn-style">

                    {/* <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button> */}
                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button onClick={resetTranscript}>Reset</button>
                    <TextToSpeech text={transcript} />

                </div>

            </div>

        </>
    );
};

export default App;