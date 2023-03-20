import React from 'react';
import AnswerEntry from './AnswerEntry';

function AnswersList({ answers }) {
  return (
    <div className="answer-list">
      <span className="a">
        A:
      </span>
      {answers.slice(0, 2).map((answer) => (
        <span>
          <AnswerEntry answer={answer} />
        </span>
      ))}

      <div>See more answers</div>
    </div>
  );
}

export default AnswersList;
