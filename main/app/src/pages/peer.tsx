import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";
import { Connector } from "@espruino-tools/peer";

let p = new Connector();

const PeerPage = () => {
  const [message, setMessage] = useState('poopopp')

  const navigate = useNavigate();
  const handleClick = () => navigate('/captions');

  return (
    <div>
      <Header title="Peer page" showBackButton={false}/>
      <div className='pageBody'>
      </div>
    </div>
  );
};

export default PeerPage;