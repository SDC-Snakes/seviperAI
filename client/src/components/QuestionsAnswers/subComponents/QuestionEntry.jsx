import React from 'react';

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
        <span className="yes-button" onClick={()=> console.log('HELPFUL')}>
          Yes({question.question_helpfulness})
        </span>
        <input type="button" className="add-answer-button" value="Add Answer" />

      </span>
    </div>
  );
}

export default QuestionEntry;
