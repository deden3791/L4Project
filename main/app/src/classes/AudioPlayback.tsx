import React, { Component } from 'react';
import "../styles/styles.css";

class AudioCapturePlayback extends Component {
  state = {
    audioContext: new (window.AudioContext)(),
    microphoneStream: null,
    microphoneSource: null,
    speakerDestination: null,
    isAudioPlaying: false,
  };

  toggleAudioPlayback = async () => {
    const { audioContext, microphoneSource, speakerDestination, isAudioPlaying } = this.state;

    if (isAudioPlaying) {
      this.cleanupAudio();
    } else {
      try {
        if (!microphoneSource) {
          const microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const microphoneSource = audioContext.createMediaStreamSource(microphoneStream);
          const speakerDestination = audioContext.destination;
  
          microphoneSource.connect(speakerDestination);
  
          this.setState({
            microphoneStream,
            microphoneSource,
            speakerDestination,
          });
        }
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    }

    this.setState({
      isAudioPlaying: !isAudioPlaying,
    });
  };

  cleanupAudio = () => {
    const { audioContext, microphoneSource, microphoneStream } = this.state;

    if (microphoneSource) {
      (microphoneSource as AudioNode).disconnect();
    }

    if (microphoneStream) {
      const tracks = (microphoneStream as MediaStream).getTracks();
      if (tracks.length > 0) {
        tracks[0].stop();
      }
    }

    if (audioContext.state === 'running') {
      audioContext.close();
    }

    this.setState({
      microphoneStream: null,
      microphoneSource: null,
      isAudioPlaying: false,
    });
  };

  render() {
    const { isAudioPlaying } = this.state;
    return (
      <div>
        <p>Microphone input is {isAudioPlaying ? 'on' : 'off'}.</p>
        <button onClick={this.toggleAudioPlayback}>
          {isAudioPlaying ? 'Turn Off Audio' : 'Turn On Audio'}
        </button>
      </div>
    );
  }
}

export default AudioCapturePlayback;
