import React, { useState } from 'react';
import "../styles/styles.css";
import { useUser } from "@clerk/clerk-react"

interface PopupProps {
  onClose: () => void;
  frequency: string;
  Q: string;
  gain: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, frequency, Q, gain }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const { user } = useUser();

  if (!user) return null;

  const updateUser = async () => {
    const existingMetadata = user?.unsafeMetadata || {};
    
    await user?.update({
      unsafeMetadata: {
        ...existingMetadata,
        [inputValue]: {
          "frequency": frequency,
          "Q": Q,
          "gain": gain
        }
      },
    });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <br />
        <label className='small-text'>
          Name this save:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <button className='small-button' onClick={() => {
          updateUser();
          onClose();
        }}>Save</button>
      </div>
    </div>
  );
};

export default Popup;
