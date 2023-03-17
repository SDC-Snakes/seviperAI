// this is the main reviews and ratings widget

import React from 'react';
import StarRating from './StarRating';
import Search from './SearchBarReviews';

const ReviewsAndRatings = () => {
  // linter doesn't like the return for only one element
  return <div>Hello from RatingsReviews
    <Search/>
    <StarRating />
  </div>;
};

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewsAndRatings;