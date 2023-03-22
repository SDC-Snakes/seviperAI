// this is the Average ratings and reviews component
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newSetRating , newResetRating } from '../../features/reviews/reviewsSlice';
import RatingBar from './RatingsBar';
import QuarterStarsAverageRating from './QuarterStarsAverageRating';
import CharBar from './CharBar';
import { FaSortDown } from 'react-icons/fa';

function AverageRatings({RNRCSS}) {
  const dispatch = useDispatch();
  const barRating = useSelector(state => state.reviews.ratingBarSelect);
  const { meta } = useSelector((state) => state.reviews);
  const obj = meta.ratings;
  const values = Object.values(obj);
  const totalNumRatings = values.reduce((a, b) => (Number(a) + Number(b)));
  const keys = Object.keys(obj);
  const starRatingPercentages = keys.map((key) => ((obj[key] / totalNumRatings) * 100));

  // recommended percentage calculation
  // eslint-disable-next-line max-len
  const recommendPercent = (Number(meta.recommended.true) / (Number(meta.recommended.true) + Number(meta.recommended.false))) * 100;
  return (
    <aside className={RNRCSS['average-ratings-left']}>
      <h3>Product Ratings</h3>
      <QuarterStarsAverageRating productRating={obj} />
      <div>
        Total number of reviews: {totalNumRatings}
      </div>
      <h4>Rating Breakdown</h4>
      {barRating.length > 0 && (
        <div>
          <h4>
            applied filters
          </h4>
          {barRating.map((filter) => (
            <span
              className ={RNRCSS['reviews-filter']}
              value={filter}
              onClick={()=>{ dispatch(newSetRating(filter))}}>
                <FaSortDown />
              {filter}
            </span>

          ))}
          <div>
            <input
            className ={RNRCSS['reviews-filter-reset-input']}

            type="submit" value="reset filters" onClick={()=>{dispatch(newResetRating())}} />
          </div>
        </div>
      )}

      {
        // make sure that the data returned from the API includes
        // all 5 stars always, meaning if no one rated the product
        // for 4 stars , 4 will still be a property in the object
        // and has a value of 0
        starRatingPercentages.map((element, index) => (
          <div key={index.toString()}>
            <RatingBar index={index} element={Number(element)} reviewsNum={values[index]} />
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
