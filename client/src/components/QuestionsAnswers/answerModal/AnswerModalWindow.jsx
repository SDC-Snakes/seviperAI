import React from 'react';
import AnswerForm from './AnswerForm';

function AnswerModalWindow() {
  const productName = 'DUMMY PRODUCT';
  const questionBody = 'DUMMY QUESTION';

  return (
    <div className="answer-modal-window">
      <div className="header">
        <p>Submit Your Answer</p>
        <p>
          {productName}
          :
          {questionBody}
        </p>
      </div>
      <AnswerForm />
    </div>
  );
}

export default AnswerModalWindow;
