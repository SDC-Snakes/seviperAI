import React, { useState } from 'react';

function RatingBar({ index, element }) {
  const [percentFill, setPercentFill] = useState(element);

  return (
    <div className="rating-bar-container">
      <span style={{ marginRight: '5px' }}> {index+1}star </span>
      <div className="rating-bar">
        <div className="rating-bar-fill" style={{ width: `${percentFill}%` }} />
      </div>
    </div>
  );
}

// MS: note to change the percentage fill later one use the percentFill state ,currently it's set to 15 times the index+1 to generate different fill %,
// An onClick is also needed to filter reviews later on

export default RatingBar;
