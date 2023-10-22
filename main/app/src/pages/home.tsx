import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";
// import { Host, Connector } from "@espruino-tools/peer";

// let host = new Host();

const HomePage = () => {
  // const [message, setMessage] = useState('poopopp')

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