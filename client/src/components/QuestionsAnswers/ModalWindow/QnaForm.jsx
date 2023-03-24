import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAsync from '../useAsync';

function QnaForm({
  qnaStyles, onAdd, productInfo, questionInfo,
}) {
  const [reqObjs, setReqObjs] = useState(Function);
  const { state: {loading, response, error} } = useAsync(reqObjs, [reqObjs]);
  const firstLoad = useRef(true);
  const isQuestionForm = questionInfo === undefined;

  useEffect(() => {
    if (response && response[0] && response[0].status === 201) {
      const type = isQuestionForm ? 'question' : 'answer';
      alert(`Thank you for your ${type}!`);
      onAdd(type, false, true);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    firstLoad.current = false;
    const formBody = {
      body: e.target[0].value,
      name: e.target[1].value,
      email: e.target[2].value,
      ...(isQuestionForm && { product_id: productInfo.id }),
    };
    const url = isQuestionForm
      ? `http://localhost:${process.env.PORT}/qa/questions/`
      : `http://localhost:${process.env.PORT}/qa/questions/${questionInfo.id}/answers`;
    setReqObjs(() => function sendReq() {return [axios.post(url, formBody)]});
  };

  const title = isQuestionForm ? 'Ask Your Question' : 'Submit your Answer';
  const subTitle = isQuestionForm
    ? `About the ${productInfo.name}`
    : `${productInfo.name}: ${questionInfo.body}`;

  return (
    <div className={qnaStyles['modal-content']}>
      <h3>{title}</h3>
      <h6>{subTitle}</h6>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="input">
            {isQuestionForm ? 'Question' : 'Answer'}
            <small style={{ color: 'red' }}>*</small>
            :
          </label>
          <input type="text" id="input" name="input" rows="3" required maxLength="1000" />
        </div>
        <div className="form-group">
          <label htmlFor="nickname-input">
            Nickname
            <small style={{ color: 'red' }}>*</small>
            :
          </label>
          <input type="text" id="nickname-input" required maxLength="60" placeholder="Example: Jack543!" />
          <p>For privacy reasons, do not use your full name or email address.</p>
        </div>
        <div className="form-group">
          <label htmlFor="email-input">
            Email
            <small style={{ color: 'red' }}>*</small>
            :
          </label>
          <input type="email" id="email-input" name="email" required maxLength="60" placeholder="Example: jack@example.com" />
          <p>For authentication reasons, you will not be emailed.</p>
        </div>
        <div className="photos">
          <input type="button" value="Upload Photos" />
          <div className="photos-view">
            <img src="image1.jpg" alt="supplement to the question/answer" />
            <img src="image2.jpg" alt="supplement to the question/answer" />
            <img src="image3.jpg" alt="supplement to the question/answer" />
          </div>
        </div>
        <input type="submit" value={isQuestionForm ? 'Submit' : 'Submit Answer'} />
        {loading && (
        <div>
          Submitting
          {isQuestionForm ? 'your question' : 'the answer'}
          ...
        </div>
        )}
        {!firstLoad.current && error
          && <div>Error has occurred. Please check your information.</div>}
      </form>
      <input type="button" className={qnaStyles['close-modal']} onClick={() => onAdd(isQuestionForm ? 'question' : 'answer', false)} value="X" />
    </div>
  );
}

export default QnaForm;
