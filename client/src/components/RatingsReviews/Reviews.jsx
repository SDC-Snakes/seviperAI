import React from 'react';
import Dropdown from './SortReviews';


//<sort> // drop down list to sort reviews
// map => <ReviewTile> // multiple review tiles will be rendered
// <more reviews button > // onClick add 2 additional review tiles
// <add a review button > // onclick renders <Review form component>


const Reviews = () => {
  // linter doesn't like the return for only one element
  return <div>Hello from RatingsReviews

    <Dropdown />
  </div>;
};

export default Reviews;