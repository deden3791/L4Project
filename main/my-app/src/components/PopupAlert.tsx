import React from 'react';
import "../styles/styles.css";

interface PopupProps {
  onClose: () => void;
}

const PopupAlert: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <p></p>
      </div>
    </div>
  );
};

export default PopupAlert;
