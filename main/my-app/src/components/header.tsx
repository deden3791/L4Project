import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/styles.css";
import Popup from '../components/Popup'; 

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {

  let navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="header">
      <div className='back-button-container'>
        {showBackButton && (
          <img className="back-button" onClick={() => navigate(-1)} src={require("../images/backButton.png")}/>
        )}
      </div>
      <h1 className="title">{title}</h1>
      <div className='setting-container'>
        <button className='settings-button' onClick={togglePopup}>
          <img className="settings" alt="Settings" src={require("../images/settings.png")}/>
        </button>
        {showPopup && <Popup onClose={togglePopup} />}
      </div>
    </div>
  );
};

export default Header;