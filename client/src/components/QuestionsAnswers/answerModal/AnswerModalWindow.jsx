import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AnswerForm from './AnswerForm';

function AnswerModalWindow({ qnaStyles, onAddAnswer, productInfo, questionInfo }) {
console.log(questionInfo);

  return (
    <div className="answer-modal-window">
      <div className="header">
        <p>Submit Your Answer</p>
        <p>
          {productInfo.name}
          :
          {questionInfo.body}
        </p>
      </div>
      (
      <div className={qnaStyles.modal}>
        <div className={qnaStyles.overlay}>
          <div className={qnaStyles['modal-content']}>
            <h2> Submit your Answer</h2>
            <h6> {questionInfo.body}</h6>
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

            <input type="button" className={qnaStyles['close-modal']} onClick={() => { onAddAnswer(false); }} value="X" />
          </div>
        </div>
      </div>
      )
      <AnswerForm />
    </div>
  );
}

export default AnswerModalWindow;
