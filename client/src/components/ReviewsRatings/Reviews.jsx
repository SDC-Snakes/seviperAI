import React, { useState } from 'react';
import Dropdown from './SortReviews';
import ReviewTile from './ReviewTile';
import ReviewAndRatingForm from './ReviewAndRatingForm';

//<sort> // drop down list to sort reviews
// map => <ReviewTile> // multiple review tiles will be rendered
// <more reviews button > // onClick add 2 additional review tiles
// <add a review button > // onclick renders <Review form component>

function Reviews({RNRCSS}) {
  const [numberReviews, setNumberReviews] = useState(2);
  const addReviews = () => {
    setNumberReviews(numberReviews + 2);
  };
  return (
    <div>

      <Dropdown />
      {[...Array(numberReviews)].map((_, index) => (
        <ReviewTile index={index} key={index.toString()} />
      ))}
      <input type="submit" value="MORE REVIEWS" onClick={addReviews} />
      <ReviewAndRatingForm RNRCSS={RNRCSS} />
    </div>
  );
}

export default Reviews;
