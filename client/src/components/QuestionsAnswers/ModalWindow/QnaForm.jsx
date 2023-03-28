import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePostNewQuestionMutation, usePostNewAnswerMutation } from '../../../features/api/apiSlice';

function QnaForm({
  qnaStyles, onAdd, questionInfo,
}) {
  const [reqObjs, setReqObjs] = useState(Function);
  const productName = useSelector((state) => state.products).details.name;
  const { productId } = useParams();
  const firstLoad = useRef(true);
  const isQuestionForm = questionInfo === undefined;
  const [triggerQuestion,
    { isSuccess: isSuccessQ,
      isLoading: isLoadingQ,
      isError: isErrorQ }]
      = usePostNewQuestionMutation();
  const [triggerAnswer,
    { isSuccess: isSuccessA,
      isLoading: isLoadingA,
      isError: isErrorA }]
    = usePostNewAnswerMutation();

  const formType = isQuestionForm ? 'question' : 'answer';
  useEffect(() => {
    // if (response && response[0] && response[0].status === 201) {
    if (isSuccessQ || isSuccessA) {
      alert(`Thank you for your ${formType}!`);
      onAdd(formType, false, true);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // change firstLoad to show error message if the request fails
    firstLoad.current = false;
    function isValidEmail(email) {
      // Regular expression for validating an email address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Test the given email against the regular expression
      return emailRegex.test(email);
    }

    const [body, name, email] = Array(3).fill(0)
      .map((item, index) => e.target[index].value);
    const errorMsg = `${body.trim().length === 0 ? `\n- ${formType}` : ''}`
    + `${name.trim().length === 0 ? '\n- nickname' : ''}`
    + `${!isValidEmail(email) ? '\n- valid email' : ''}`;

    if (errorMsg.length > 0) {
      alert(`You must enter the following:` + `${errorMsg}`);
    } else {
      const formBody = {
        body,
        name,
        email,
        ...(isQuestionForm && { product_id: Number(productId) }),
      };
      if (isQuestionForm) {
        triggerQuestion(formBody);
      } else {
        triggerAnswer({ body: formBody, questionId: Number(questionInfo.id) });
      }
      // `http://localhost:${process.env.PORT}/qa/questions/${questionInfo.id}/answers`;
      // setReqObjs(() => function sendReq() { return [axios.post(url, formBody)]; });
    }
  };

  const title = isQuestionForm ? 'Ask Your Question' : 'Submit your Answer';
  const subTitle = isQuestionForm
    ? `About the ${productName}`
    : `${productName}: ${questionInfo.body}`;

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
          <textarea id="input" name="input" rows="3" maxLength="1000" style={{width:"100px", height:"100px"}}/>
        </div>
        <div className="form-group">
          <label htmlFor="nickname-input">
            Nickname
            <small style={{ color: 'red' }}>*</small>
            :
          </label>
          <input type="text" id="nickname-input" maxLength="60" placeholder="Example: Jack543!" />
          <p>For privacy reasons, do not use your full name or email address.</p>
        </div>
        <div className="form-group">
          <label htmlFor="email-input">
            Email
            <small style={{ color: 'red' }}>*</small>
            :
          </label>
          <input type="text" id="email-input" name="email" maxLength="60" placeholder="Example: jack@example.com" />
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
        {(isLoadingQ || isLoadingA) && (
        <div>
          Submitting
          {isQuestionForm ? 'your question' : 'the answer'}
          ...
        </div>
        )}
        {!firstLoad.current && (isErrorQ || isErrorA)
          && <div>Error has occurred. Please check your information.</div>}
      </form>
      <input type="button" className={qnaStyles['close-modal']} onClick={() => onAdd(formType, false)} value="X" />
    </div>
  );
}

export default QnaForm;
