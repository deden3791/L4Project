import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";

// let host = new Host();

const HomePage = () => {
  const [audio, setAudio] = useState<null | MediaStream>(null);

  const navigate = useNavigate();
  const handleClick = () => navigate('/captions');

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(audio);
  };

  useEffect(() => {
    console.log("audio", audio)
  }, [audio])

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