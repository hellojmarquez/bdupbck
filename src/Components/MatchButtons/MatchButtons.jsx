import React from 'react';
import { useMediaQuery } from 'react-responsive';
import BtnX from '../BtnX/BtnX.jsx';
import BtnStar from '../BtnStar/BtnStar.jsx';
import BtnBack from '../BtnBack/BtnBack.jsx';

const MatchButtons = ({ handleNextUser, handlePreviousUser, id }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const spaceClass = isMobile ? 'space-x-6' : 'space-x-20';

  return (
    <div className={`flex justify-center ${spaceClass} mx-6 pt-3`}>
      <BtnBack handlePreviousUser={handlePreviousUser} />
      <BtnX handleNextUser={handleNextUser} />
      <BtnStar id={id} handleNextUser={handleNextUser} />
    </div>
  );
};

export default MatchButtons;
