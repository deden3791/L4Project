import { EagleProfilerWorker, EagleProfiler, EagleProfile, EagleProfilerEnrollResult, EagleProfilerEnrollFeedback } from "@picovoice/eagle-web";

function getAudioData(numSamples: number): Int16Array {
  // Implement logic to capture audio frame of size `numSamples`
  return new Int16Array(numSamples); // Example placeholder
}

const SpeakerRecognition = async (): Promise<void> => {
  const ACCESS_KEY: string = 'cx7LHaBXZPLMRWspgKUMhcNbWM+miQSQB8M4HsBi6BxWufk0GWkoQw==';
  const eagleModel = {
    publicPath: "../../public/eagle_params.pv",
  };

  try {
    const eagleProfiler: EagleProfilerWorker = await EagleProfilerWorker.create(ACCESS_KEY, eagleModel);

    let percentage: number = 0;
    while (percentage < 100) {
      const audioData: Int16Array = getAudioData(eagleProfiler.minEnrollSamples);
      
      const result: EagleProfilerEnrollResult = await eagleProfiler.enroll(audioData);
      if (result.feedback === EagleProfilerEnrollFeedback.AUDIO_OK) {
          // Audio enrollment successful
      } else {
          // Handle feedback indicating why audio wasn't used in enrollment
      }
      percentage = result.percentage;
    }

    const speakerProfilePromise: Promise<EagleProfile> = eagleProfiler.export();
    const speakerProfile: EagleProfile = await speakerProfilePromise;

    eagleProfiler.release();

    // if on worker thread
    // eagleProfiler.terminate();

    // Use the 'speakerProfile' data here

  } catch (error) {
    console.error("Error:", error);
  }
}

export default SpeakerRecognition;
