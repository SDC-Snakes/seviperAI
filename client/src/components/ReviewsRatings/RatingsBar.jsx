/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { newSetRating } from '../../features/reviews/reviewsSlice';

function RatingBar({ index, element, reviewsNum }) {
  const percentFill = element;
  const dispatch = useDispatch();
  const rateFunc = (starNum) => {
    dispatch(newSetRating(starNum));
  };
  return (

    <div
      className="rating-bar-container"
      onClick={() => (rateFunc(index + 1))}
    >
      <span style={{ font: '2px' }}>
        {index + 1}
        Stars
      </span>
      <div className="rating-bar">
        <div className="rating-bar-fill" style={{ width: `${percentFill}%` }} />
      </div>
      <span>
        {`(${reviewsNum})`}
      </span>
    </div>
  );
}
export default RatingBar;
