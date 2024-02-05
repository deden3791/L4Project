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
        <ToggleSwitch defaultChecked={false} onChange={handleToggleChange} />
        {isTextPage ? <TextPage /> : <CaptionsPage />}
      </div>
    </div>
  );
};

export default HomePage;
