import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";

// let host = new Host();

const HomePage = () => {

  const navigate = useNavigate();
  const handleClickCaptions = () => navigate('/captions');
  const handleClickText = () => navigate('/text');

  return (
    <div>
      <Header title="Earbud Controller" showBackButton={false}/>
      <div className='pageBody'>
        <button className="big-button" type="button" onClick={handleClickCaptions}>
          Speech To Text
        </button>
        <button className="big-button" type="button" onClick={handleClickText}>
          Text to Speech
        </button>
      </div>
    </div>
  );
};

export default HomePage;