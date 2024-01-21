import React, { useState, useEffect } from "react";
import "../styles/styles.css";

interface TextToSpeechProps {
  text: any;
}

const TextToSpeech = ({ text }: TextToSpeechProps) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[0]);
    console.log(text)

    return () => {
      if (text == '') {
        synth.cancel();
      }
    };
  }, [text]);

  // useEffect(() => {
  //   const synth = window.speechSynthesis;
  //   if (utterance) {
  //     utterance.voice = voice;
  //     utterance.pitch = pitch;
  //     utterance.rate = rate;
  //     utterance.volume = volume;
  //     synth.speak(utterance);
  //   }
  // }, [voice, pitch, rate, volume]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }
    if (utterance && voice) {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((v) => v.name === event.target.value);
    setVoice(selectedVoice || null);
  };

  const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div>
      <p className="big-text">Text-to-speech:</p>
      <label className="small-text">
        Voice: 
        <select value={voice?.name || ""} onChange={handleVoiceChange} className="small-button">
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label className="small-text">
        Pitch:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
        <text>{pitch}</text>
      </label>

      <br />

      <label className="small-text">
        Speed:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
        <text>{rate}</text>
      </label>

      <br />

      <label className="small-text">
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <text>{volume}</text>
      </label>

      <br />
      <div className="button-container">
        <button className="small-button" onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
        <button className="small-button" onClick={handlePause}>Pause</button>
        <button className="small-button" onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default TextToSpeech;
