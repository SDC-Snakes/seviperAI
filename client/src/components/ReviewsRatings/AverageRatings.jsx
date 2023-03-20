// this is the Average ratings and reviews component
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RatingBar from './RatingsBar';
import QuarterStarsAverageRating from './QuarterStarsAverageRating';

function AverageRatings() {
  let {reviews, meta} = useSelector((state) => state.reviews);
  return (
    <aside>
      <h3>RATINGS & REVIEWS</h3>
      <QuarterStarsAverageRating />
      <div>% of reviews recommend this product</div>
      {
        [...Array(5)].map((element, index) => {
          return(<div key={index.toString()}> <RatingBar index={index} /> </div> );
        })
      }
    </aside>
  );
}

export default AverageRatings;
