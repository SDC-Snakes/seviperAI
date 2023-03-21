import React from 'react';
import { useParams } from 'react-router-dom';
import AnswerForm from './AnswerForm';

function AnswerModalWindow({ qnaStyles, onToggleAnswer }) {
  const params = useParams();
  const productName = 'DUMMY PRODUCT';
  const questionBody = 'DUMMY QUESTION';

  console.log(params);

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
      (
      <div className={qnaStyles.modal}>
        <div className={qnaStyles.overlay}>
          <div className={qnaStyles['modal-content']}>
            <h2> Submit your Answer</h2>
            <h6>{productName}: {questionBody}</h6>
            <p>
              please fill out the fields below to submit a product review
            </p>
            <input value="" placeholder="title" />
            <div>
              Do you recommend this product?
            </div>
            <div>
              <input value="" placeholder="Review Summary" />
            </div>
            <div>
              <input value="" placeholder="Review Body" />
            </div>
            <div>
              <input type="button" value="Add Images" />
            </div>
            <div>
              <input value="" placeholder="username" />
            </div>
            <div>
              <input value="" placeholder="email" />
            </div>
            <div>
              <input type="button" value="Submit Review" />
            </div>

            <input type="button" className={qnaStyles['close-modal']} onClick={() => { onToggleAnswer(false); }} value="X" />
          </div>
        </div>
      </div>
      )
      <AnswerForm />
    </div>
  );
}

export default AnswerModalWindow;
