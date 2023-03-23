import React from 'react';
import QuarterIncStarRating from './QuarterIncStarRating';

function QuarterStarsAverageRating({ productRating }) {
  let sum = 0;
  let numOfRatings = 0;

  for (const key in productRating) {
    sum+= (Number(key) * Number(productRating[key]));
    numOfRatings += Number(productRating[key]);
  }

  const averageRating = sum / numOfRatings;

  return (
    <span>
      {Math.round(averageRating * 10) / 10} <QuarterIncStarRating averageRating={averageRating} />
    </span>
  );
}

export default QuarterStarsAverageRating;
