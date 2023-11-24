import { EagleProfilerWorker, EagleProfiler, EagleProfile, EagleProfilerEnrollResult, EagleProfilerEnrollFeedback } from "@picovoice/eagle-web";

const SpeakerRecognition = async () => {

  const ACCESS_KEY = 'cx7LHaBXZPLMRWspgKUMhcNbWM+miQSQB8M4HsBi6BxWufk0GWkoQw==';

  const eagleModel = {
    publicPath: "../../public/eagle_params.pv",
  }

  // Main thread
  const eagleProfiler = await EagleProfiler.create(
          ACCESS_KEY,
          eagleModel);

  // or on worker thread
  // const eagleProfiler = await EagleProfilerWorker.create(
  //         ${ACCESS_KEY},
  //         eagleModel);

  async function getAudioData(numSamples: number) {
    const audioContext = new (window.AudioContext || window.AudioContext)();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
  
      let chunks: Float32Array[] = [];
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        chunks.push(new Float32Array(inputData));
      };
  
      source.connect(processor);
      processor.connect(audioContext.destination);
  
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          processor.disconnect();
          source.disconnect();
          stream.getTracks().forEach((track) => track.stop());
          const audioData = chunks.flat().slice(0, numSamples);
          const int16Data = audioData.map((value: any) => Math.round(value * 32767));
          resolve();
        }, 1000); // Adjust the duration as needed to capture the required audio
      });
  
      const audioData = chunks.flat().slice(0, numSamples);
      const int16Data = audioData.map((value: any) => Math.round(value * 32767));
      return new Int16Array(int16Data);
    } catch (error) {
      // Handle errors (e.g., user denied microphone access)
      throw new Error(`Error accessing microphone: ${error}`);
    }
  }
  
  // let percentage = 0;
  // while (percentage < 100) {
  //   const audioData = getAudioData(eagleProfiler.minEnrollSamples);
    
  //   const result: EagleProfilerEnrollResult = await eagleProfiler.enroll(audioData);
  //   if (result.feedback === EagleProfilerEnrollFeedback.AUDIO_OK) {
  //       // audio is good!
  //   } else {
  //       // feedback code will tell you why audio was not used in enrollment
  //   }
  //   percentage = result.percentage;
  // }

  // const speakerProfile: EagleProfile = eagleProfiler.export();
  
  eagleProfiler.release();

  // if on worker thread
  // eagleProfiler.terminate();

  return (
    <div></div>
  );
}

export default SpeakerRecognition;