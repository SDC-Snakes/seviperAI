import React from 'react';
import { FaStar } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';

function QuarterIncStarRating({averageRating}) {
  if (!averageRating) {
    return (<span> unable to fetch stars</span>);
  }
  const fullStarsNum = Math.floor(averageRating);
  const remainder = `${(Math.round(((averageRating - fullStarsNum)) * 4) / 4) * 100}%`;
  const greyStars = 5 - (Math.ceil(averageRating));
  const starKey = nanoid();
  return (

    <span>
      {[...Array(fullStarsNum)].map(() => (
        <span key={`yellow_star ${nanoid()}`}>
          <FaStar style={{ color: '#ffc107' }} />
        </span>
      ))}
      { (averageRating - fullStarsNum) !== 0 && (
        <span key="fraction_star ">
          <svg width="0" height="0">
            <linearGradient id={starKey} x1="0%" y1="0%" x2="100%" y2="0%">

              <stop offset="0%" stopColor="#ffc107" />
              <stop offset={remainder} stopColor="#ffc107" />
              <stop offset={remainder} stopColor="#e4e5e9" />
              <stop offset="100%" stopColor="#e4e5e9" />
            </linearGradient>
          </svg>
          <FaStar style={{ fill: `url(#${starKey})` }} />
        </span>
      )}
      {[...Array(greyStars)].map(() => (
        <span key={`grey_star_${nanoid()}`}>
          <FaStar style={{ color: '#e4e5e9' }} />
        </span>
      ))}
    </span>

  );
}

export default QuarterIncStarRating;
