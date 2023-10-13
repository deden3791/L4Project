import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/styles.css";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  let navigate = useNavigate();
  return (
    <div className="header">
      <div className='back-button-container'>
        {showBackButton && (
          <img className="back-button" onClick={() => navigate(-1)} src={require("../images/backButton.png")}/>
        )}
      </div>
      <div className="headerContainer">
        <h1 className="title">{title}</h1>
      </div>
      {/* <button className="settings-button" >Settings</button> */}
      <div className='setting-container'>
        <img className="settings" alt="Settings" src={require("../images/settings.png")}/>
      </div>
    </div>
  );
};

export default Header;

{/* <header className="header">
          <div className="title">Earbud Controller</div>
          <img className="settings" alt="Settings" src="settings-1.png" />
        </header> */}