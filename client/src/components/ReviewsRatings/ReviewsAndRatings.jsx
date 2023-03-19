// this is the main reviews and ratings widget

import React from 'react';
import AverageRatings from './AverageRatings';
import Search from './SearchBarReviews';
import Reviews from './Reviews';

function ReviewsAndRatings() {
  return (
    <div>
      Hello from RatingsReviews
      <Search />
      <AverageRatings />
      <Reviews />
    </div>
  );
}

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewsAndRatings;
