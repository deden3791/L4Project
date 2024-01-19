import React, { useState } from 'react';
import "../styles/styles.css";
import { useUser } from "@clerk/clerk-react"

interface PopupProps {
  onClose: () => void;
  filterType: string;
  frequency: string;
  Q: string;
  gain: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, filterType, frequency, Q, gain }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

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
          "trigger": checked, 
          "filterType": filterType,
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
        <br />
        <br />
        <label className='small-text'>
        Save this as a trigger word?
        <input type='checkbox' checked={checked} onChange={handleChange} />
        </label>
        <br />
        <br />
        <button className='small-button' onClick={() => {
          updateUser();
          onClose();
        }}>Save</button>
      </div>
    </div>
  );
};

export default Popup;