import React from 'react';
import "../styles/styles.css";
import { SignOutButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <p></p>
      </div>
    </div>
  );
};

export default Popup;
