// star rating component, used to create 5 stars and fill the stars up based on the users rating.
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <span>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index.toString()}>
            <input type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => (setRating(ratingValue))} />

            <FaStar className="star"
            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            size={50}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)} />
          </label>
        );
      })}
    </span>
  );
}

export default StarRating;

// hide the radio buttons with css
// input[type='radio'] {
//  display:none;
// }
// change the mouse curser to pointer on hover
// .star{
//   cursor: pointer;
//   transition: color 200ms;
// }

// idea for gradient fill
// {/* <svg width="0" height="0">
//   <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
//     <stop stopColor="#7a6ded" offset="0%" />
//     <stop stopColor="#591885" offset="100%" />
//   </linearGradient>
// </svg>

// <FiCheck style={{ stroke: "url(#blue-gradient)" }} /> */}
