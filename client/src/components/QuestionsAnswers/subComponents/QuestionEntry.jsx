import React from 'react';
import AnswerEntry from './AnswerEntry';

function QuestionEntry() {
  return (
    <div className="question-entry">
      <span className="q">
        Q:
      </span>
      <span>
        <span className="question-text">
          How do you greet world?
        </span>
        <span className="helpful-text">
          Helpful?
        </span>
        <button type="button" className="yes-button">Yes</button>
        <button type="button" className="add-answer-button">Add Answer</button>
        <div className="answer-list">
          <span className="a">
            A:
          </span>
          <span>
            <AnswerEntry />
            <AnswerEntry />
          </span>
          <div>See more answers</div>
        </div>
      </span>
    </div>
  );
}

export default QuestionEntry;
