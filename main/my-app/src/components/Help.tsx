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
        <br />
        <table>
          <thead>
            <tr>
              <th className='small-text-light'>Filter Type</th>
              <th className='small-text-light'>Description</th>
              <th className='small-text-light'>Frequency</th>
              <th className='small-text-light'>Q</th>
              <th className='small-text-light'>Gain</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='smaller-text'>Low-pass</td>
              <td className='smaller-text'>Standard second-order resonant lowpass filter with 12dB/octave rolloff. Frequencies below the cutoff pass through; frequencies above it are attenuated.</td>
              <td className='smaller-text'>The cutoff frequency.</td>
              <td className='smaller-text'>Indicates how peaked the frequency is around the cutoff. The greater the value is, the greater is the peak.</td>
              <td className='smaller-text'>Not used</td>
            </tr>
            <tr>
              <td className='smaller-text'>High-pass</td>
              <td className='smaller-text'>Standard second-order resonant highpass filter with 12dB/octave rolloff. Frequencies below the cutoff are attenuated; frequencies above it pass through.</td>
              <td className='smaller-text'>The cutoff frequency.</td>
              <td className='smaller-text'>Indicates how peaked the frequency is around the cutoff. The greater the value, the greater the peak.</td>
              <td className='smaller-text'>Not used</td>
            </tr>
            <tr>
              <td className='smaller-text'>Band-pass</td>
              <td className='smaller-text'>Standard second-order bandpass filter. Frequencies outside the given range of frequencies are attenuated; the frequencies inside it pass through.</td>
              <td className='smaller-text'>The center of the range of frequencies.</td>
              <td className='smaller-text'>Controls the width of the frequency band. The greater the Q value, the smaller the frequency band.</td>
              <td className='smaller-text'>Not used</td>
            </tr>
            <tr>
              <td className='smaller-text'>Lowshelf</td>
              <td className='smaller-text'>Standard second-order lowshelf filter. Frequencies lower than the frequency get a boost, or an attenuation; frequencies over it are unchanged.</td>
              <td className='smaller-text'>The upper limit of the frequencies getting a boost or an attenuation.</td>
              <td className='smaller-text'>Not used</td>
              <td className='smaller-text'>The boost, in dB, to be applied; if negative, it will be an attenuation.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Highshelf</td>
              <td className='smaller-text'>Standard second-order highshelf filter. Frequencies higher than the frequency get a boost or an attenuation; frequencies lower than it are unchanged.</td>
              <td className='smaller-text'>The lower limit of the frequencies getting a boost or an attenuation.</td>
              <td className='smaller-text'>Not used</td>
              <td className='smaller-text'>The boost, in dB, to be applied; if negative, it will be an attenuation.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Peaking</td>
              <td className='smaller-text'>Frequencies inside the range get a boost or an attenuation; frequencies outside it are unchanged.</td>
              <td className='smaller-text'>The middle of the frequency range getting a boost or an attenuation.</td>
              <td className='smaller-text'>Controls the width of the frequency band. The greater the Q value, the smaller the frequency band.</td>
              <td className='smaller-text'>The boost, in dB, to be applied; if negative, it will be an attenuation.</td>
            </tr>
            <tr>
              <td className='smaller-text'>Notch</td>
              <td className='smaller-text'>Standard notch filter, also called a band-stop or band-rejection filter. It is the opposite of a bandpass filter: frequencies outside the given range of frequencies pass through; frequencies inside it are attenuated.</td>
              <td className='smaller-text'>The center of the range of frequencies.</td>
              <td className='smaller-text'>Controls the width of the frequency band. The greater the Q value, the smaller the frequency band.</td>
              <td className='smaller-text'>Not used</td>
            </tr>
            <tr>
              <td className='smaller-text'>Allpass</td>
              <td className='smaller-text'>Standard second-order allpass filter. It lets all frequencies through, but changes the phase-relationship between the various frequencies.</td>
              <td className='smaller-text'>The frequency with the maximal group delay, that is, the frequency where the center of the phase transition occurs.</td>
              <td className='smaller-text'>Controls how sharp the transition is at the medium frequency. The larger this parameter is, the sharper and larger the transition will be.</td>
              <td className='smaller-text'>Not used</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <p className='small-text'>To contact us about any feedback or issues, please email <a href="mailto:2514468e@student.gla.ac.uk">2514468e@student.gla.ac.uk</a> :)</p>
      </div>
    </div>
  );
};

export default Popup;
