import React from 'react';
import "../styles/styles.css";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className='small-button' onClick={onClose}>Close</button>
        <br />
        <table>
          <thead>
            <tr>
              <th className='small-text-light'>Filter Type</th>
              <th className='small-text-light'>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='smaller-text'>Low-pass Filter</td>
              <td className='smaller-text'>Allows frequencies below a specified cutoff frequency to pass through while attenuating frequencies above.</td>
            </tr>
            <tr>
              <td className='smaller-text'>High-pass Filter</td>
              <td className='smaller-text'>Allows frequencies above a specified cutoff frequency to pass through while attenuating frequencies below.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Band-pass Filter</td>
              <td className='smaller-text'>Allows a range of frequencies centered around a cutoff frequency to pass through while attenuating frequencies outside that range.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Notch Filter</td>
              <td className='smaller-text'>Attenuates a narrow band of frequencies centered around a specified frequency.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Peaking Filter</td>
              <td className='smaller-text'>Boosts or cuts a range of frequencies around a center frequency with adjustable bandwidth and gain.</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <th className='small-text-light'>Adjusting Parameters</th>
              <th className='small-text-light'>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='smaller-text'>Frequency</td>
              <td className='smaller-text'>Sets the cutoff or centre frequency of the filter.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Q Factor</td>
              <td className='smaller-text'>Determines the width of the frequency band affected by the filter, affecting the resonance or sharpness of the filter's response.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Gain</td>
              <td className='smaller-text'>Used in peaking and shelving filters to boost or attenuate specific frequency ranges.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Popup;
