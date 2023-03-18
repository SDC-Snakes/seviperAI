import React from 'react';
import StarRating from '../ReviewsRatings/StarRating';

function Details({ details }) {
  return (
    <div>
      <div>
        <StarRating />
      </div>
      {details.category}
      <br />
      {details.name}
    </div>
  );
}

export default Details;
