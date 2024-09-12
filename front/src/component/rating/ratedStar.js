import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const RatedStars = ({ totalStars }) => {
  const integerPart = Math.floor(totalStars);
  const hasFractionalPart = totalStars % 1 !== 0;

  return (
    <div>
      {[...Array(integerPart)].map((_, index) => (
        <FaStar key={index} size={24} color={'gold'} />
      ))}
      {hasFractionalPart && <FaStarHalfAlt size={24} color={'gold'} />}
    </div>
  );
};

export default RatedStars;
