import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuarterIncStarRating from './QuarterIncStarRating';

function QuarterStarsAverageRating() {
  const { meta } = useSelector((state) => state.reviews);
  const obj = meta.ratings;
  // obj will be replaced with the "ratings" object from the API,  /reviews/meta route.

  let sum = 0;
  let numOfRatings = 0;

  for (const key in obj) {
    sum+= (Number(key) * Number(obj[key]));
    numOfRatings += Number(obj[key]);
  }

  const averageRating = sum / numOfRatings;

  return (
    <span>
      {Math.round(averageRating * 10) / 10} <QuarterIncStarRating averageRating={averageRating} />
    </span>
  );
}

export default QuarterStarsAverageRating;
