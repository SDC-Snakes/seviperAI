import React from 'react';
import AnswerEntry from './AnswerEntry';

function QuestionEntry({ question }) {
  return (
    <div className="question-entry">
      <span className="q">
        Q:
      </span>
      <span>
        <span className="question-text">
          {question.question_body}
        </span>
        <span className="helpful-text">
          Helpful?
        </span>
        <input type="button" className="yes-button" value="Yes" />
        <input type="button" className="add-answer-button" value="Add Answer" />

      </span>
    </div>
  );
}

export default QuestionEntry;
