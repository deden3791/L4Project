import React from 'react';
import AudioCapturePlayback from './AudioPlayback';
import "../styles/styles.css";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <p></p>
        <AudioCapturePlayback />
      </div>
    </div>
  );
};

export default Popup;
