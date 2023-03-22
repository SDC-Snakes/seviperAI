import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newSetRating } from '../../features/reviews/reviewsSlice';

function RatingBar({ index, element, reviewsNum }) {
  const [percentFill, setPercentFill] = useState(element);
  const transparent = { background: 'transparent' };
  const grey = { background: 'rgba(4,4,4,.1)' };

  const [color, setcolor] = useState(transparent);
  const dispatch = useDispatch();
  const barRating = useSelector(state => state.reviews.ratingBarSelect);

  const rateFunc = (starNum) => {
    dispatch(newSetRating(starNum));
    console.log('barRating: ', barRating);
  };
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="rating-bar-container"
      style={color}
      onMouseEnter={() => (setcolor(grey))}
      onMouseLeave={() => (setcolor(transparent))}
      onClick={() => (rateFunc(index + 1))}
    >
      <span style={{ marginRight: '5px' }}>
        {index + 1}Stars
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

// MS: note to change the percentage fill later one use the percentFill state ,currently it's set to 15 times the index+1 to generate different fill %,
// An onClick is also needed to filter reviews later on

export default RatingBar;
