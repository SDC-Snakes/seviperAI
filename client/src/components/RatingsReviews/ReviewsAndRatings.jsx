// this is the main reviews and ratings widget

import React from 'react';
import StarRating from './StarRating';
import AverageRatings from './AverageRatings';

const ReviewsAndRatings = () => {
  // linter doesn't like the return for only one element
  return <div>Hello from RatingsReviews
    <Search/>
    <AverageRatings />
  </div>;
};

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewsAndRatings;