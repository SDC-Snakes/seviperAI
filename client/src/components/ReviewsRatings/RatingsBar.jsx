import React, { useState } from 'react';

function RatingBar({ index, element, reviewsNum }) {
  const [percentFill, setPercentFill] = useState(element);
  const transparent = { background: 'transparent' };
  const grey = { background: 'rgba(4,4,4,.1)' };

  const [color, setcolor] = useState(transparent);

  return (
    <div className="rating-bar-container" style={color} onMouseEnter={() => (setcolor(grey))} onMouseLeave={() => (setcolor(transparent))}>
      <span style={{ marginRight: '5px' }}>{index+1}star {`(${reviewsNum})`}</span>
      <div className="rating-bar">
        <div className="rating-bar-fill" style={{ width: `${percentFill}%` }} />
      </div>
    </div>
  );
}

// MS: note to change the percentage fill later one use the percentFill state ,currently it's set to 15 times the index+1 to generate different fill %,
// An onClick is also needed to filter reviews later on

export default RatingBar;
