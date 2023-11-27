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

  // function getAudioData(numSamples): Int16Array {
  //   // get audio frame of size `numSamples`
  // }

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