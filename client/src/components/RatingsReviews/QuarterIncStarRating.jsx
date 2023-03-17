import React, { useState } from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

function HalfIncStarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 0.5;
        return (
          <label key={index.toString()}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            {ratingValue <= rating ? (
              <FaStar className="star" color="#ffc107" size={50} />
            ) : ratingValue - 0.5 <= rating ? (
              <FaStarHalf className="star" color="#ffc107" size={50} />
            ) : (
              <FaStar className="star" color="#e4e5e9" size={50} />
            )}
          </label>
        );
      })}
    </div>
  );
}

export default HalfIncStarRating;