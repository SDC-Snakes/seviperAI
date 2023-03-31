/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// this is the Average ratings and reviews component
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSortDown } from 'react-icons/fa';
import { newSetRating, newResetRating } from '../../features/reviews/reviewsSlice';
import RatingBar from './RatingsBar';
import QuarterStarsAverageRating from './QuarterStarsAverageRating';
import CharBar from './CharBar';

function AverageRatings({ RNRCSS }) {
  const dispatch = useDispatch();
  const barRating = useSelector((state) => state.reviews.ratingBarSelect);
  const { meta } = useSelector((state) => state.reviews);
  const obj = meta.ratings;
  const values = Object.values(obj);
  if (values.length === 0) {
    return <span>...Loading</span>;
  }
  const totalNumRatings = values.reduce((a, b) => (Number(a) + Number(b)), 0);
  const keys = Object.keys(obj);
  const starRatingPercentages = keys.map((key) => ((obj[key] / totalNumRatings) * 100));
  // eslint-disable-next-line max-len
  const recommendPercent = (Number(meta.recommended.true) / (Number(meta.recommended.true) + Number(meta.recommended.false))) * 100;
  return (
    <aside className={RNRCSS['average-ratings-left']}>
      <h3>Product Ratings</h3>
      <QuarterStarsAverageRating productRating={obj} />
      <div style={{ marginTop: '2%' }}>
        Total number of reviews:
        {' '}
        {totalNumRatings}
      </div>
      <h4 style={{ marginTop: '2%' }}>Rating Breakdown</h4>
      {barRating.length > 0 && (
        <div>
          <h4>
            applied filters
          </h4>
          {barRating.map((filter, index) => (
            <span
              className={RNRCSS['reviews-filter']}
              key={index.toString()}
              value={filter}
              onClick={() => { dispatch(newSetRating(filter)); }}
            >
              <FaSortDown />
              {filter}
            </span>

          ))}
          <div>
            <input
              className={RNRCSS['reviews-filter-reset-input']}
              type="submit"
              value="reset filters"
              onClick={() => { dispatch(newResetRating()); }}
            />
          </div>
        </div>
      )}

      {
        starRatingPercentages.map((element, index) => (
          <div key={index.toString()}>
            <RatingBar
              index={index}
              element={Number(element)}
              reviewsNum={values[index]}
            />
          </div>
        ))
      }
      <div>
        {Math.round(recommendPercent)}
        % of reviews recommend this product
      </div>
      <div>
        <CharBar />
      </div>
    </aside>
  );
}

export default AverageRatings;
