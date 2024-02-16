import { useState } from 'react';
import "../styles/styles.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextToSpeech from '../components/TextToSpeech';
import AudioCapturePlayback from '../components/AudioPlayback';
import AudioAnalysis from '../components/AudioAnalysis';
import EnrollmentComponent from '../components/EagleComponent';

interface LangOption {
  language: string;
  countries: string[];
}

const langs: LangOption[] = [
  { language: 'Afrikaans', countries: ['af-ZA'] },
  { language: 'Bahasa Indonesia', countries: ['id-ID'] },
  { language: 'Bahasa Melayu', countries: ['ms-MY'] },
  { language: 'Català', countries: ['ca-ES'] },
  { language: 'Čeština', countries: ['cs-CZ'] },
  { language: 'Deutsch', countries: ['de-DE'] },
  { language: 'English', countries: ['en-AU', 'en-CA', 'en-IN', 'en-NZ', 'en-ZA', 'en-GB', 'en-US'] },
  { language: 'Español', countries: ['es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-EC', 'es-SV', 'es-ES', 'es-US', 'es-GT', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PY', 'es-PE', 'es-PR', 'es-DO', 'es-UY', 'es-VE'] },
  { language: 'Euskara', countries: ['eu-ES'] },
  { language: 'Français', countries: ['fr-FR'] },
  { language: 'Galego', countries: ['gl-ES'] },
  { language: 'Hrvatski', countries: ['hr_HR'] },
  { language: 'IsiZulu', countries: ['zu-ZA'] },
  { language: 'Íslenska', countries: ['is-IS'] },
  { language: 'Italiano', countries: ['it-IT', 'it-CH'] },
  { language: 'Magyar', countries: ['hu-HU'] },
  { language: 'Nederlands', countries: ['nl-NL'] },
  { language: 'Norsk bokmål', countries: ['nb-NO'] },
  { language: 'Polski', countries: ['pl-PL'] },
  { language: 'Português', countries: ['pt-BR', 'pt-PT'] },
  { language: 'Română', countries: ['ro-RO'] },
  { language: 'Slovenčina', countries: ['sk-SK'] },
  { language: 'Suomi', countries: ['fi-FI'] },
  { language: 'Svenska', countries: ['sv-SE'] },
  { language: 'Türkçe', countries: ['tr-TR'] },
  { language: 'български', countries: ['bg-BG'] },
  { language: 'Pусский', countries: ['ru-RU'] },
  { language: 'Српски', countries: ['sr-RS'] },
  { language: '한국어', countries: ['ko-KR'] },
  { language: '中文', countries: ['cmn-Hans-CN', 'cmn-Hans-HK', 'cmn-Hant-TW', 'yue-Hant-HK'] },
  { language: '日本語', countries: ['ja-JP'] },
  { language: 'Lingua latīna', countries: ['la'] }
];

const countryNames: { [key: string]: string } = {
  'en-AU': 'Australia',
  'en-CA': 'Canada',
  'en-IN': 'India',
  'en-NZ': 'New Zealand',
  'en-ZA': 'South Africa',
  'en-GB': 'United Kingdom',
  'en-US': 'United States',
  'es-AR': 'Argentina',
  'es-BO': 'Bolivia',
  'es-CL': 'Chile', 
  'es-CO': 'Colombia', 
  'es-CR': 'Costa Rica', 
  'es-EC': 'Ecuador', 
  'es-SV': 'El Salvador', 
  'es-ES': 'España', 
  'es-US': 'Estados Unidos', 
  'es-GT': 'Guatemala', 
  'es-HN': 'Honduras', 
  'es-MX': 'México', 
  'es-NI': 'Nicaragua', 
  'es-PA': 'Panamá', 
  'es-PY': 'Paraguay', 
  'es-PE': 'Perú', 
  'es-PR': 'Puerto Rico', 
  'es-DO': 'República Dominicana', 
  'es-UY': 'Uruguay', 
  'es-VE': 'Venezuela',
  'it-IT': 'Italia',
  'it-CH': 'Svizzera',
  'pt-BR': 'Brasil',
  'pt-PT': 'Portugal',
  'cmn-Hans-CN': '普通话 (中国大陆)',
  'cmn-Hans-HK': '普通话 (香港)',
  'cmn-Hant-TW': '中文 (台灣)',
  'yue-Hant-HK': '粵語 (香港)',
};

const CaptionsPage = () => {
  const [listening, setListening] = useState(false);
  const [textSize, setTextSize] = useState<string>('medium');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [selectedCountry, setSelectedCountry] = useState<string>('en-GB');

  const textAreaStyle = {
    border: '2px solid',
    borderColor: '#c49175',
    borderRadius: '30px',
    height: '255px',
    width: '100%',
    padding: '2%',
    fontFamily: '"Gothic A1-Bold", Helvetica',
    fontSize: textSize === 'small' ? '18px' : (textSize === 'medium' ? '22px' : '26px'),
    fontWeight: '700',
    letterSpacing: '0',
    color: '#c49175',
    background: '#f2ebee',
  };

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true, language: selectedCountry });
      setListening(true);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    setSelectedCountry(langs.find(lang => lang.language === selectedLang)?.countries[0] || '');
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const isCountryDropdownVisible = langs.find(lang => lang.language === selectedLanguage)?.countries.length !== 1;

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <p className='big-text'>Speech-to-text</p>
      <p className='small-text'>Listening: {listening ? 'on' : 'off'}</p>
      
      <textarea
        className='text-box'
        value={transcript}
        placeholder='Waiting for speech'
        style={textAreaStyle}
      />

      <div className='row'>
        <div className="button-container">
          <button className="small-button" onClick={toggleListening}>
            {listening ? 'Stop Listening' : 'Start Listening'}
          </button>
          <button className="small-button" onClick={resetTranscript}>Reset</button>
        </div>
        <div className="row">
          <label className='big-text'>Language:
            <select value={selectedLanguage} onChange={handleLanguageChange} className="small-button">
              {langs.map(lang => (
                <option key={lang.language} value={lang.language}>{lang.language}</option>
              ))}
            </select>
          </label>
          {isCountryDropdownVisible && (
            <label className='big-text'>Country:
              <select value={selectedCountry} onChange={handleCountryChange} className="small-button">
                {langs.find(lang => lang.language === selectedLanguage)?.countries.map(country => (
                  <option key={country} value={country}>{countryNames[country] || country}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      <div className='row'>
        <TextToSpeech text={transcript} />
        <AudioCapturePlayback text={transcript} />
      </div>

      {/* <EnrollmentComponent />
      <AudioAnalysis /> */}
    </div>
  );
};

export default CaptionsPage;