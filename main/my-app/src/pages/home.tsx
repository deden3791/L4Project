import React, { useState } from 'react';
import Header from '../components/header';
import ToggleSwitch from '../components/ToggleSwitch'; 
import CaptionsPage from './captions';
import TextPage from './text';
import '../styles/styles.css';

const HomePage = () => {
  const [isTextPage, setIsTextPage] = useState(false);

  const handleToggleChange = (isChecked: boolean) => {
    setIsTextPage(isChecked);
  };

  return (
    <div>
      <Header title="Earbud Controller" showBackButton={false} />
      <div className='pageBody'>
        <div className='row'> 
          <p className='big-text'>Change page: </p>
          <ToggleSwitch defaultChecked={false} onChange={handleToggleChange} />
        </div>
        {isTextPage ? <TextPage /> : <CaptionsPage />}
      </div>
    </div>
  );
};

export default HomePage;
