import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Header from '../components/header';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import ResetPassword from '../components/resetPassword'

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
  const navigate = useNavigate();
  const [showResetPassword, setShowResetPassword] = useState(false);

  const toggleResetPassword = () => {
    setShowResetPassword(!showResetPassword);
  };

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
    return (
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th className='small-text-light'>Name</th>
              <th className='small-text-light'>Filter Type</th>
              <th className='small-text-light'>Frequency (Hz)</th>
              <th className='small-text-light'>Q</th>
              <th className='small-text-light'>Gain</th>
              <th className='small-text-light'>Trigger?</th>
              <th className='small-text-light'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(user.unsafeMetadata as UnsafeMetadata).map(
              ([save, details]) => (
                <tr key={save}>
                  <td className='smaller-text'>{save}</td>
                  <td className='smaller-text'>{details.filterType}</td>
                  <td className='smaller-text'>{details.frequency}</td>
                  <td className='smaller-text'>{details.Q}</td>
                  <td className='smaller-text'>{details.gain}</td>
                  <td className='smaller-text'>{details.trigger ? 'yes' : 'no'}</td>
                  <td>
                    <button className='small-button-dark' onClick={() => handleDeleteSave(save)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Header title='Earbud Controller' showBackButton={true} />
      <div className='pageBody'>
        <h1 className='bigger-text'>User Profile</h1>
        <p className='small-text'>Name: {user.fullName}</p>
        <p className='small-text'>Email: {user.primaryEmailAddress?.emailAddress}</p>
        <p className='small-text'>Last signed in: {user.lastSignInAt?.toDateString()}</p>
        <button className='small-button' onClick={toggleResetPassword}>Reset password</button>
        {showResetPassword && <ResetPassword onClose={toggleResetPassword} />}
        <br />
        <button className='small-button-dark' onClick={handleDelete}>DELETE ACCOUNT</button>
        <div>
          <h2 className='big-text'>Saved settings:</h2>
          {renderMetadata()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;