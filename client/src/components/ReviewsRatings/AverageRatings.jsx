// this is the Average ratings and reviews component
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RatingBar from './RatingsBar';
import QuarterStarsAverageRating from './QuarterStarsAverageRating';

function AverageRatings() {
  const { meta } = useSelector((state) => state.reviews);
  const obj = meta.ratings;
  const values = Object.values(obj);
  const totalNumRatings = values.reduce((a, b) => (Number(a) + Number(b)));
  const keys = Object.keys(obj);
  const starRatingPercentages = keys.map((key) => ((obj[key] / totalNumRatings) * 100));

  return (
    <aside>
      <h3>RATINGS & REVIEWS</h3>
      <QuarterStarsAverageRating />
      <div>% of reviews recommend this product</div>
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
    </aside>
  );
}

export default AverageRatings;
