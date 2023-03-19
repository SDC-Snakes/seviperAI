import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function RatingBar({ index }) {
  const [percentFill, setPercentFill] = useState((index + 1) * 15);

  let {reviews} = useSelector((state) => state.reviews);
  return (
    <div className="rating-bar-container">
      <span style={{ marginRight: '5px' }}>{index+1}star</span>
      <div className="rating-bar">
        <div className="rating-bar-fill" style={{ width: `${percentFill}%` }} />
      </div>
    </div>
  )
}

// MS: note to change the percentage fill later one use the percentFill state ,currently it's set to 15 times the index+1 to generate different fill %,
// An onClick is also needed to filter reviews later on


export default RatingBar;