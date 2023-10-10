import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  let navigate = useNavigate();
  return (
    <div className="header">
      {showBackButton && (
        <button onClick={() => navigate(-1)}>Back</button> 
      )}
      <h1 className="header-title">{title}</h1>
      <button className="settings-button">Settings</button>
    </div>
  );
};

export default Header;