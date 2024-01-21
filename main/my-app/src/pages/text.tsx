import { useState } from 'react';
import "../styles/styles.css";
import TextToSpeech from '../components/TextToSpeech';

const TextPage = () => {
    const [textarea, setTextarea] = useState();
    const [textSize, setTextSize] = useState<string>('medium');
  
    const handleChange = (event: any) => {
      setTextarea(event.target.value)
    }

    const textAreaStyle = {
      border: '2px solid',
      borderColor: '#c49175',
      borderRadius: '30px',
      height: '255px',
      width: '718px',
      padding: '1%',
      fontFamily: '"Gothic A1-Bold", Helvetica',
      fontSize: textSize === 'small' ? '18px' : (textSize === 'medium' ? '22px' : '26px'),
      fontWeight: '700',
      letterSpacing: '0',
      color: '#c49175',
    };

  return (
    <div>
      <p className='big-text'>Text-to-speech</p>
      <textarea
      value={textarea}
      placeholder='Enter text to start :)'
      onChange={handleChange}
      style={textAreaStyle}
      />
      <br />
      <label className='big-text'>Text size:
          <select value={textSize} onChange={(event) => setTextSize(event.target.value)} className="small-button">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

      {textarea && <TextToSpeech text={textarea} />}
    </div>
  );
};

export default TextPage;