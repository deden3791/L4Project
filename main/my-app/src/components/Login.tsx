import React from 'react';
import "../styles/styles.css";
import { SignOutButton, SignInButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {

  const navigate = useNavigate();
  const handleClickProfile = () => navigate('/profile');

  const { user } = useUser();
  
  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <br />
        <SignedOut>
          <p className='small-text'>You are not signed in!</p>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {(user ? <div className='small-text'>Hello {user.fullName}!</div> : null)}
          <SignOutButton />
          <button className="big-button" type="button" onClick={handleClickProfile}>
            Profile Page
          </button>
        </SignedIn>
      </div>
    </div>
  );
};

export default Popup;
