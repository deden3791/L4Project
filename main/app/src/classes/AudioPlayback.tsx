import React, { Component } from 'react';

class AudioCapturePlayback extends Component {
  state = {
    audioContext: new (window.AudioContext)(),
    microphoneStream: null,
    microphoneSource: null,
    speakerDestination: null,
  };

  async componentDidMount() {
    try {
      const { audioContext } = this.state;

      // Get microphone input
      const microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const microphoneSource = audioContext.createMediaStreamSource(microphoneStream);

      // Get speaker output
      const speakerDestination = audioContext.destination;

      // Connect the microphone input to the speaker output
      microphoneSource.connect(speakerDestination);

      this.setState({
        microphoneStream,
        microphoneSource,
        speakerDestination,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  }

  componentWillUnmount() {
    this.cleanupAudio();
  }

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
  };
  
  

  render() {
    return (
      <div>
        <p>Microphone input is being played through the speakers.</p>
      </div>
    );
  }
}

export default AudioCapturePlayback;
