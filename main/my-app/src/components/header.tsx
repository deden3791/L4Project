import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/styles.css";
import Login from './Login'; 
import Help from './Help'; 


interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {

  let navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="header">
      <div className='back-button-container'>
        {showBackButton && (
          <img className="back-button" onClick={() => navigate(-1)} src={require("../assets/backButton.png")}/>
        )}
      </div>
      <h1 className="title-light">{title}</h1>
      <div className='row'>
        <div className='setting-container'>
          <button className='settings-button' onClick={toggleLogin}>
            <img className="settings" alt="Settings" src={require("../assets/profile.png")}/>
          </button>
          {showLogin && <Login onClose={toggleLogin} />}
        </div>
        <div className='setting-container'>
          <button className='settings-button' onClick={toggleHelp}>
            <img className="settings" alt="Settings" src={require("../assets/settings.png")}/>
          </button>
          {showHelp && <Help onClose={toggleHelp} />}
        </div>
      </div>
    </div>
  );
};

export default Header;