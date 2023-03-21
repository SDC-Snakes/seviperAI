import React, { useState } from 'react';
import Dropdown from './SortReviews';
import ReviewTile from './ReviewTile';
import ReviewAndRatingForm from './ReviewAndRatingForm';

//<sort> // drop down list to sort reviews
// map => <ReviewTile> // multiple review tiles will be rendered
// <more reviews button > // onClick add 2 additional review tiles
// <add a review button > // onclick renders <Review form component>

function Reviews({RNRCSS, handleSortState}) {
  const [numberReviews, setNumberReviews] = useState(2);
  const addReviews = () => {
    setNumberReviews(numberReviews + 2);
  };
  return (
    <div className={RNRCSS['reviews-container-right']}>
      <h3>Product Reviews</h3>


      <Dropdown handleSortState={handleSortState} />
      {[...Array(numberReviews)].map((_, index) => (
        <div className={RNRCSS['review-tile']} key={index.toString()}>
          <ReviewTile index={index} />
        </div>
      ))}
      <input type="submit" value="MORE REVIEWS" onClick={addReviews} />
      <ReviewAndRatingForm RNRCSS={RNRCSS} />
    </div>
  );
}

export default Reviews;
