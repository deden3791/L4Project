// import KrispSDK,{ IAudioFilterNode } from './dist/krispsdk';
// import {useState, useRef} from "react";



// const [started, setStarted] = useState(false); 
// const [isReady, setIsReady] = useState(false); 
// const [isEnabled, setIsEnabled] = useState(null);

// const audioElement = useRef(); // to play the audio
// const sdk = useRef(); // to store our sdk
// const stream = useRef(); // to store user media
// const filterNode = useRef<IAudioFilterNode>(); // to store our filter
// const audioContext = useRef(new AudioContext()); // to store AudioContext
// const source = useRef(); // to store MediaStreamSource
// const destination = useRef(); // to store MediaStreamDestination

// const onStart = async () => {
//     setStarted(true);

//     sdk.current = new KrispSDK({
//       params: {
//         logProcessStats: false,
//         debugLogs: false,
//         models: {
//           model8: "/dist/models/model_8.kw",
//           model16: "/dist/models/model_16.kw",
//           model32: "/dist/models/model_32.kw",
//         },
//         useSharedArrayBuffer: false
//       },
//       callbacks: {
//         errorCallback: () => {},
//       },
//     });

//     const audioSettings = {
//       audio: {
//         echoCancellation: true,
//         noiseSuppression: false,
//         autoGainControl: false,
//       },
//     };

//     stream.current = await navigator.mediaDevices.getUserMedia(audioSettings);

//     await audioContext.current.resume();
//     sdk.current.init();

//     filterNode.current = await sdk.current.createNoiseFilter(
//       audioContext.current,
//       () => setIsReady(true)
//     );

//     source.current = audioContext.current.createMediaStreamSource(
//       stream.current
//     );
//     destination.current = audioContext.current.createMediaStreamDestination();

//     source.current.connect(filterNode.current);
//     filterNode.current.connect(destination.current);

//     if (audioElement.current) {
//       audioElement.current.srcObject = destination.current.stream;
//       audioElement.current.play();
//     }
// };

// const onToggle = () => {
//     if (filterNode.current?.isEnabled()) {
//       filterNode.current.disable();
//       setIsEnabled(false);
//     } else {
//       filterNode.current?.enable();
//       setIsEnabled(true);
//     }
//   };

// const onDestroy = async () => {
//     if (source.current) source.current.disconnect();
//     if (destination.current) destination.current.disconnect();
//     if (stream.current)
//         stream.current.getTracks().forEach((track) => track.stop());
//     if (filterNode.current) filterNode.current.disconnect();
//     await filterNode.current?.dispose();
//     if (audioContext) await audioContext.current.suspend();

//     sdk.current?.dispose();
//     audioElement.current?.pause();

//     setStarted(false);
//     setIsEnabled(null);
// };

// {/* <audio
//   ref={audioElement}
//   id="audio"
//   autoPlay={true}
//   controls={true}
// /> */}