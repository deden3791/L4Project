import React from 'react';
import "../styles/styles.css";
import { SignOutButton, SignInButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {

  const navigate = useNavigate();
  const handleClickUser = () => navigate('/L4Project/profile');

  const { user } = useUser();
  
  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <br />
        <br />
        <SignedOut>
          <p className='big-text'>You are not signed in!</p>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {(user ? <div className='big-text'>Hello {user.fullName}!</div> : null)}
          <br />
          <button className="big-button" type="button" onClick={handleClickUser}>
            Profile Page
          </button>
          <br />
          <br />
          <SignOutButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Popup;
