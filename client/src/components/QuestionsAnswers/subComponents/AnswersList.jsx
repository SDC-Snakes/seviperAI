import React, { useState } from 'react';
import AnswerEntry from './AnswerEntry';

function AnswersList({ answers }) {
  const [answersList, setAnswersList] = useState(
    Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness),
  );
  const [numberOfAs, setNumberOfAs] = useState(2);
  const [folded, setFolded] = useState(true);
  const answerFold = () => {
    setNumberOfAs(folded ? answersList.length : 2);
    setFolded(!folded);
  };
  return (
    <div className="answer-list">
      <span className="a">
        A:
      </span>
      {answersList.slice(0, numberOfAs).map((answer) => (
        <span>
          <AnswerEntry answer={answer} />
        </span>
      ))}

      <div>
        <b
          style={{ cursor: 'pointer' }}
          onClick={answerFold}
          role="button"
          onKeyPress={answerFold}
          tabIndex={0}
        >
          {folded ? 'See more answers' : 'Collapse answers'}
        </b>
      </div>
    </div>
  );
}

export default AnswersList;
