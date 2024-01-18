import React, { useState } from 'react';
import Header from '../components/header';
import "../styles/styles.css";
import TextToSpeech from '../components/TextToSpeech';

const TextPage = () => {
    const [textarea, setTextarea] = useState();
  
    const handleChange = (event: any) => {
      setTextarea(event.target.value)
    }
  return (
    <div>
      <Header title="Earbud Controller" showBackButton={true} />
      <div className='pageBody'>

        <textarea
        value={textarea}
        placeholder='Enter text to start :)'
        onChange={handleChange}
        className='text-box'
        />

        {textarea && <TextToSpeech text={textarea} />}
      </div>
    </div>
  );
};

export default TextPage;