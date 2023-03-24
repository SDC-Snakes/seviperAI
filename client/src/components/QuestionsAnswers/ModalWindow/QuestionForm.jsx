import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAsync from '../useAsync';

function QuestionForm({
  qnaStyles, onAdd, productInfo,
}) {
  const [reqObjs, setReqObjs] = useState(Function);
  const { state: { loading, response, error } } = useAsync(reqObjs, [reqObjs]);

  useEffect(() => {
    if (response !== null && response[0] && response[0].status === 201) {
      alert('Thank you for your question!')
      onAdd('question', false, true);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setReqObjs(() => function postRequest() {
      return [
        axios.post(`http://localhost:${process.env.PORT}/qa/questions/`, {
          body: e.target[0].value,
          name: e.target[1].value,
          email: e.target[2].value,
          product_id: productInfo.id,
        }),
      ];
    });
  };
  // if (response !== null && response[0] && response[0].status === 201) {
  //   alert('Thank you for your answer!')
  //   onAddAnswer(false);
  // }
  return (((response === null) || response.length === 0)) && (
    <div className={qnaStyles['modal-content']}>
      <h3> Ask Your Question</h3>
      <h6>
        {`About the ${productInfo.name}`}
      </h6>
      <form onSubmit={onSubmit}>
        <div className="question-form-group">
          <label htmlFor="question-input">Question:</label>
          <input type="text" id="question-input" name="question" rows="3" required maxLength="1000" />
        </div>
        <div className="question-form-group">
          <label htmlFor="nickname-input">Nickname:</label>
          <input type="text" id="nickname-input" required maxLength="60" placeholder="Example: jackson11!" />
          <p>For privacy reasons, do not use your full name or email address</p>
        </div>
        <div className="question-form-group">
          <label htmlFor="email-input">Email:</label>
          <input type="email" id="email-input" name="email" required maxLength="60" placeholder="Example: jack@example.com" />
          <p>For authentication reasons, you will not be emailed.</p>
        </div>
        <div className="photos">
          <input type="button" value="Upload Photos" />
          <div className="photos-view">
            <img src="image1.jpg" alt="supplement to the question" />
            <img src="image2.jpg" alt="supplement to the question" />
            <img src="image3.jpg" alt="supplement to the question" />
          </div>
        </div>
        <input type="submit" value="Submit" />
        {loading && <div> Submitting your question...</div>}
        {error && <div>Error has occurred. Please try again.</div>}
      </form>
      <input type="button" className={qnaStyles['close-modal']} onClick={() => { onAdd('question', false); }} value="X" />
    </div>
  );
}

export default QuestionForm;
