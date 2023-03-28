import React, { useState } from 'react';
import { useHelpfulQNAMutation } from '../../../features/api/apiSlice';

function HelpfulModule({ count, item, itemId }) {
  const [countTemp, setCountTemp] = useState(count);
  const [triggerHelpful, { isSuccess, reset }] = useHelpfulQNAMutation();

  if (isSuccess) {
    setCountTemp(count + 1);
    reset();
  }

  const onClick = () => {
    triggerHelpful({ item, itemId });
  };

  return (
    <>
      <span className="helpful-text">
        Helpful?
      </span>
      <span className="yes-button" onClick={onClick}>
        Yes(
        {countTemp}
        )
      </span>
    </>
  );
}

export default HelpfulModule;
