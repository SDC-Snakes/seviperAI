import React from 'react';

function HelpfulModule({ count, onClick }) {
  return (
    <>
      <span className="helpful-text">
        Helpful?
      </span>
      <span className="yes-button" onClick={onClick}>
        Yes(
        {count}
        )
      </span>
    </>
  );
}

export default HelpfulModule;
