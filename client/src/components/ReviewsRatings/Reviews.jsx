/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from './SortReviews';
import ReviewTile from './ReviewTile';
import ReviewAndRatingForm from './ReviewAndRatingForm';

function Reviews({RNRCSS, handleSortState}) {
  const barRating = useSelector(state => state.reviews.ratingBarSelect);
  const { reviews } = useSelector((state) => state.reviews);
  const [numberReviews, setNumberReviews] = useState(2);
  const addReviews = () => {
    setNumberReviews(numberReviews + 2);
  };
  const filteredArr = barRating.length > 0 ? reviews.results.filter((el) => barRating.includes(el.rating)) : reviews.results;

  return (
    <>
      <div className={RNRCSS['reviews-container-right']}>
        <h3>Product Reviews</h3>
        <Dropdown handleSortState={handleSortState} />
        <div className={RNRCSS['reviews-block']} style={{ overflow: 'auto', maxHeight: '500px' }}>
          {filteredArr.map((review, index) => {
            if (index < numberReviews) {
              return (
              <div className={RNRCSS['review-tile']} key={index.toString()}>
              <ReviewTile reviewsObj={review} />
              </div>
              );
            }
          })}
        </div>

        {filteredArr.length - numberReviews >= 1 && <input type="submit" value="MORE REVIEWS" onClick={addReviews} />}
        <ReviewAndRatingForm RNRCSS={RNRCSS} />
      </div>
    </>
  );
}

export default Reviews;
