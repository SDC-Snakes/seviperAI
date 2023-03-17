import React, { useState } from 'react';
import StarRating from '../RatingsReviews/StarRating';

function Details({ styles, details }) {
  return (
    <div>
      <div>
        <StarRating />
      </div>
      {details.category}
      <br/>
      {details.name}
    </div>
  );
}

export default Details;
