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
        <br />
        <SignedOut>
          <SignInButton />
          <p>This content is public. Only signed out users can see the SignInButton above this text.</p>
        </SignedOut>
        <SignedIn>
          <SignOutButton />
          <p>This content is private. Only signed in users can see the SignOutButton above this text.</p>
        </SignedIn>
      </div>
    </div>
  );
};

export default Popup;
