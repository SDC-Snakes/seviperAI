import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function RelatedStars({ productRating }) {
  let sum = 0;
  let numOfRatings = 0;
  if (!productRating) {
    return <span>unable to retrieve rating</span>;
  }
  for (const key in productRating) {
    sum+= (Number(key) * Number(productRating[key]));
    numOfRatings += Number(productRating[key]);
  }

  const averageRating = sum / numOfRatings;
  console.log('averageRating', averageRating)

  const [fullStarsNum, setFullStarsNum] = useState(Math.floor(averageRating));
  const [remainder, setRemainder] = useState(`${(Math.round(((averageRating - fullStarsNum)) * 4) / 4) * 100}%`);
  const [greyStars, setGreyStars] = useState(5 - (Math.ceil(averageRating)));

  return (

    <span>
      {Math.round(averageRating * 10) / 10}
      {[...Array(fullStarsNum)].map((_, index) => (
        <span key={`yellow_star ${index}`}>
          <FaStar style={{ color: '#ffc107' }} />
        </span>
      ))}
      { (averageRating - fullStarsNum) !== 0 && (
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
    </span>

  );
}

export default RelatedStars;
