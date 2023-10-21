import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";
import AudioCapturePlayback from '../classes/AudioPlayback'; 

const HomePage = () => {

  const navigate = useNavigate();
  const handleClick = () => navigate('/captions');

  return (
    <div>
      <Header title="Earbud Controller" showBackButton={false}/>
      <div className='pageBody'>
        <button className="big-button" type="button" onClick={handleClick}>
          Captions
        </button>
      </div>
    </div>
  );
};

export default HomePage;