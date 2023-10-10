import React from 'react';
import withLayout from "./layout"
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/captions');

  return (
    <button type="button" onClick={handleClick}>
      Captions
    </button>
  );
};

export default withLayout(HomePage, "Earbud Controller", false);