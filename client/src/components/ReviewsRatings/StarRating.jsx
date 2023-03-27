/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// star rating component, used to create 5 stars and fill the stars up based on the users rating.
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';

function StarRating({ handleStarRatingChange }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const ratingValues = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  const ratingDescription = ratingValues[rating - 1] || '';
  return (
    <span>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={nanoid()}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                handleStarRatingChange(ratingValue);
              }}
            />

            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={50}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <span>{ratingDescription}</span>
    </span>
  );
}

export default StarRating;
