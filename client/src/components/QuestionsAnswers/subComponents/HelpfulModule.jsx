import React, { useState } from 'react';
import { useHelpfulQNAMutation } from '../../../features/api/apiSlice';
import qnaStyles from '../qnaStyles.module.css';

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
    <span className={qnaStyles['helpful-tile']}>
      <span>
        Helpful?{" "}
      </span>
      <span
        className={qnaStyles['helpful-tile-yes']}
        onClick={onClick}
        aria-label='helpful-button'
      >
        Yes(
        {countTemp}
        )
      </span>
    </span>
  );
}

export default HelpfulModule;
