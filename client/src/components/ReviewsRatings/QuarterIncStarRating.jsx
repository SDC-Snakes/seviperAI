import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
// once the data is retreived from the API,
// ratingNum has to be replaced by the incoming review rating.
// setState is not being utilized, might need to be removed or replaced when implementing redux
function QuarterIncStarRating({averageRating}) {
  // set ratingNum to equal averageRating when the data is fetched from the API /reviews/meta route
  const ratingNum = averageRating;
  const [fullStarsNum, setFullStarsNum] = useState(Math.floor(ratingNum));
  const [remainder, setRemainder] = useState(`${(Math.round(((ratingNum - fullStarsNum)) * 4) / 4) * 100}%`);
  const [greyStars, setGreyStars] = useState(5 - (Math.ceil(ratingNum)));

  return (

    <div>
      {[...Array(fullStarsNum)].map((_, index) => (
        <span key={`yellow_star ${index}`}>
          <FaStar style={{ color: '#ffc107' }} />
        </span>
      ))}
      { (ratingNum - fullStarsNum) !== 0 && (
        <span key="fraction_star ">
          <svg width="0" height="0">
            <linearGradient id="gradient-colored" x1="0%" y1="0%" x2="100%" y2="0%">

              <stop offset="0%" stopColor="#ffc107" />
              <stop offset={remainder} stopColor="#ffc107" />
              <stop offset={remainder} stopColor="#e4e5e9" />
              <stop offset="100%" stopColor="#e4e5e9" />
            </linearGradient>
          </svg>
          <FaStar style={{ fill: 'url(#gradient-colored)' }} />
        </span>
      )}
      {[...Array(greyStars)].map((_, index) => (
        <span key={`grey_star_${index}`}>
          <FaStar style={{ color: '#e4e5e9' }} />
        </span>
      ))}
    </div>

  );
}

export default QuarterIncStarRating;
