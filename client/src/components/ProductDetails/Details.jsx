import React, { useState } from 'react';
import StarRating from '../ReviewsRatings/StarRating';

function Details({ details, styles }) {
  const [selectedStyle, setSelectedStyle] = useState(0);

  return (
    <div>
      <div>
        <StarRating />
        <button type="button">See all reviews</button>
      </div>
      <div>
        {details.category}
      </div>
      <div>
        {details.name}
      </div>
      <div>
        {styles[selectedStyle].original_price}
      </div>
    </div>
  );
}

export default Details;
