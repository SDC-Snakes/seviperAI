/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from './SortReviews';
import ReviewTile from './ReviewTile';
import ReviewAndRatingForm from './ReviewAndRatingForm';

function Reviews({ RNRCSS, handleSortState, sortState }) {
  const barRating = useSelector((state) => state.reviews.ratingBarSelect);
  const { reviews } = useSelector((state) => state.reviews);
  const [numberReviews, setNumberReviews] = useState(2);
  const addReviews = () => {
    setNumberReviews(numberReviews + 2);
  };
  const filteredArr = barRating.length > 0
    ? reviews.results.filter((el) => barRating.includes(el.rating))
    : reviews.results;

  return (
    <div className={RNRCSS['reviews-container-right']}>
      <h3>Product Reviews</h3>
      <Dropdown
        handleSortState={handleSortState}
        sortState={sortState}
      />
      <div
        className={RNRCSS['reviews-block']}
        style={{ overflow: 'auto', maxHeight: '500px' }}
      >
        {filteredArr.map((review, index) => {
          if (index < numberReviews) {
            return (
              <div
                className={RNRCSS['review-tile']}
                key={review.review_id}
              >
                <ReviewTile reviewsObj={review} />
              </div>
            );
          }
        })}
      </div>

      {filteredArr.length - numberReviews >= 1 && <input type="submit" value="MORE REVIEWS" onClick={addReviews} />}
      <ReviewAndRatingForm RNRCSS={RNRCSS} />
    </div>
  );
}

export default Reviews;
