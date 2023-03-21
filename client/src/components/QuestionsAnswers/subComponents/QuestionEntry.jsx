import React from 'react';
import HelpfulModule from './HelpfulModule';

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
        <HelpfulModule count={question.question_helpfulness} onClick={() => console.log('HELPFUL')} />
        <input type="button" className="add-answer-button" value="Add Answer" />
      </span>
    </div>
  );
}

export default QuestionEntry;
