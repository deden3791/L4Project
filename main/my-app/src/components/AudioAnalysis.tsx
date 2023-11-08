import React, { useEffect, useState } from 'react';
import PopupAlert from './PopupAlert';

const AudioAnalyzer = () => {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [audioData, setAudioData] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const loadAudioFile = async () => {
      try {
        const response = await fetch('../audios/UKAmbulance.mp3');
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          setAudioData(uint8Array);
        } else {
          console.error('Failed to fetch the audio file');
        }
      } catch (error) {
        console.error('Error loading audio file:', error);
      }
    };
    loadAudioFile();
  }, []); // The empty dependency array ensures that this effect runs only once

  return (
    <div>
      {/* <button onClick={togglePopup}>
        </button>
        {showPopup && <PopupAlert onClose={togglePopup} />} */}
      {audioData && (
        <div>
          Audio Data Loaded: {audioData.length} bytes
        </div>
      )}
    </div>
  );
};

export default AudioAnalyzer;
