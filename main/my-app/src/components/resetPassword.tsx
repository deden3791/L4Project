import React, { useState } from 'react';
import '../styles/styles.css';
import { useUser } from '@clerk/clerk-react';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const { user } = useUser();
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    setError(null); 
  };

  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
    setError(null);
  };

  const updatePassword = async () => {
    try {
      if (newPassword === repeatPassword && user) {
        await user.updatePassword({
          newPassword: newPassword
        });
        onClose(); 
      } else {
        setError("Passwords do not match."); 
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError("An error occurred while updating the password.");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <p className='big-text'>Set new password:</p>
        <label className='small-text'>
          New password:
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </label>
        <br />
        <br />
        <label className='small-text'>
          Repeat password:
          <input
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
        </label>
        {error && <p className='error-message'>{error}</p>}
        <br />
        <br />
        <button className='small-button' onClick={updatePassword}>Reset</button>
      </div>
    </div>
  );
};

export default Popup;