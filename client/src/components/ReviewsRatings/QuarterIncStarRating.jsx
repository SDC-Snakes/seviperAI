import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';
// once the data is retreived from the API,
// ratingNum has to be replaced by the incoming review rating.
// setState is not being utilized, might need to be removed or replaced when implementing redux
function QuarterIncStarRating({averageRating}) {
  // set ratingNum to equal averageRating when the data is fetched from the API /reviews/meta route
  if (!averageRating ) {
    return (<span> unable to fetch stars</span>)
  }
  // const ratingNum = averageRating ;
  const fullStarsNum = Math.floor(averageRating);
  const remainder = `${(Math.round(((averageRating - fullStarsNum)) * 4) / 4) * 100}%`;
  const greyStars = 5 - (Math.ceil(averageRating));
  const starKey = nanoid()
  return (

    <span>
      {[...Array(fullStarsNum)].map((_, index) => (
        <span key={`yellow_star ${index}`}>
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
      {[...Array(greyStars)].map((_, index) => (
        <span key={`grey_star_${index}`}>
          <FaStar style={{ color: '#e4e5e9' }} />
        </span>
      ))}
    </span>

  );
}

export default QuarterIncStarRating;
