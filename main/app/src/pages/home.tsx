// import React from 'react';
// import withLayout from "./layout"
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const handleClick = () => navigate('/captions');

//   return (
//     <button type="button" onClick={handleClick}>
//       Captions
//     </button>
//   );
// };

// export default withLayout(HomePage, "Earbud Controller", false);

import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import "../styles/styles.css";

const HomePage = () => {

  const navigate = useNavigate();
  const handleClick = () => navigate('/captions');

  return (
    <div>
      <Header title="Earbud Controller" showBackButton={false}/>
      <div className='pageBody'>
        <button className="big-button" type="button" onClick={handleClick}>
          Captions
        </button>
      </div>
    </div>
  );
};

export default HomePage;