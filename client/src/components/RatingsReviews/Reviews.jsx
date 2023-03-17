import React , { useState } from 'react';
import Dropdown from './SortReviews';
import ReviewTile from './ReviewTile';

//<sort> // drop down list to sort reviews
// map => <ReviewTile> // multiple review tiles will be rendered
// <more reviews button > // onClick add 2 additional review tiles
// <add a review button > // onclick renders <Review form component>


const Reviews = () => {
const [numberReviews, setNumberReviews] = useState(2)

const addReviews = () => {
  setNumberReviews(numberReviews+2)
}
   return (
  <div>
    <Dropdown />
    {[...Array(numberReviews)].map((_, index) => {
      return (
      <ReviewTile key={index.toString()} />
      )
    })}
    <button onClick={addReviews}>MORE REVIEWS</button>
    <button >ADD A REVIEW</button>
  </div>
  );
};

export default Reviews;