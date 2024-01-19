import React from 'react';
import { useUser } from '@clerk/clerk-react';
import Header from '../components/header';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';

interface MetadataDetails {
  Q: number;
  gain: number;
  trigger: boolean;
  frequency: number;
  filterType: string;
}

interface UnsafeMetadata {
  [save: string]: MetadataDetails;
}

const UserProfile = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // Move the hook outside of the component

  if (!user) {
    return <div className='big-text'>Loading...</div>;
  }

  const deleteUser = user?.delete;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      if (deleteUser) {
        await deleteUser();
        navigate('/');
      }
    }
  };

  const renderMetadata = () => {
    const handleDeleteSave = (save: string) => {
        if (window.confirm(`Are you sure you want to delete the save "${save}"?`)) {

          const updatedMetadata = { ...user.unsafeMetadata };
          const deletedMetadata = updatedMetadata[save];
          delete updatedMetadata[save];
    
          user.update({unsafeMetadata: updatedMetadata });
        }
    };
    return Object.entries(user.unsafeMetadata as UnsafeMetadata).map(
        ([save, details]) => (
            <div key={save}>
            <h2 className='big-text'>Save: {save}</h2>
            <p className='small-text'>Filter type: {details.filterType}</p>
            <p className='small-text'>Frequency: {details.frequency} Hz</p>
            <p className='small-text'>Q: {details.Q}</p>
            <p className='small-text'>Gain: {details.gain}</p>
            <p className='small-text'>Is this a trigger word: {details.trigger ? 'yes' : 'no'}</p>
            <button className='small-button' onClick={() => handleDeleteSave(save)}>
                DELETE SAVE
            </button>
            </div>
        )
    );
  };

  return (
    <div>
      <Header title='Earbud Controller' showBackButton={true} />
      <div className='pageBody'>
        <h1 className='big-text'>User Profile</h1>
        <p className='small-text'>Name: {user.fullName}</p>
        <div>
          <h2 className='big-text'>Metadata</h2>
          {renderMetadata()}
        </div>
        <button className='small-button' onClick={handleDelete}>DELETE ACCOUNT</button>
      </div>
    </div>
  );
};

export default UserProfile;