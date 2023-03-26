import React from 'react';
import QuarterIncStarRating from './QuarterIncStarRating';

function QuarterStarsAverageRating({ productRating }) {
  let sum = 0;
  let numOfRatings = 0;
  if (!productRating || Object.keys(productRating).length === 0) {
    return ;
  }
  for (const key in productRating) {
    sum+= (Number(key) * Number(productRating[key]));
    numOfRatings += Number(productRating[key]);
  }

  const averageRating = sum / numOfRatings;
  const roundedAvg = Math.round(averageRating * 10) / 10;
  return (
    <span>
      {roundedAvg} <QuarterIncStarRating averageRating={roundedAvg} />
    </span>
  );
}

export default QuarterStarsAverageRating;
