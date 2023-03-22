/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from './SortReviews';
import ReviewTile from './ReviewTile';
import ReviewAndRatingForm from './ReviewAndRatingForm';

//<sort> // drop down list to sort reviews
// map => <ReviewTile> // multiple review tiles will be rendered
// <more reviews button > // onClick add 2 additional review tiles
// <add a review button > // onclick renders <Review form component>

function Reviews({RNRCSS, handleSortState}) {
  const barRating = useSelector(state => state.reviews.ratingBarSelect);
  const { reviews } = useSelector((state) => state.reviews);
  const [numberReviews, setNumberReviews] = useState(2);
  const [renderedElements, setRenderedElements] = useState(0);
  const addReviews = () => {
    setNumberReviews(numberReviews + 2);
  };
  // passing updateRenderedElements to reviewTile causes an infinite loop, needs work!
  // const updateRenderedElements = () => {
  //   setRenderedElements(renderedElements + 1);
  // };
   return (
    <>
      <div className={RNRCSS['reviews-container-right']}>
        <h3>Product Reviews</h3>
        <Dropdown handleSortState={handleSortState} />
        {[...Array(numberReviews)].map((_, index) => {
          if ((barRating.length === 0 || barRating.includes(reviews.results[index].rating))) {
          return <div className={RNRCSS['review-tile']} key={index.toString()}>
            <ReviewTile index={index}  />
          </div>
          } else if (numberReviews<=5){
            setNumberReviews(numberReviews+1)
          }
        })
        }
        <input type="submit" value="MORE REVIEWS" onClick={addReviews} />
        <ReviewAndRatingForm RNRCSS={RNRCSS} />
      </div>
    </>
  );
}

export default Reviews;
