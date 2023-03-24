import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAsync from '../useAsync';

function AnswerForm({
  qnaStyles, onAdd, productInfo, questionInfo,
}) {
  const [reqObjs, setReqObjs] = useState([]);
  const { state: { loading, response, error } } = useAsync(reqObjs, [reqObjs]);

  useEffect(() => {
    if (response !== null && response[0] && response[0].status === 201) {
      alert('Thank you for your answer!')
      onAdd('answer', false, true);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setReqObjs(() => ([
      axios.post(`http://localhost:${process.env.PORT}/qa/questions/${questionInfo.id}/answers`, {
        body: e.target[0].value,
        name: e.target[1].value,
        email: e.target[2].value,
      }),
    ]));
  };
  // if (response !== null && response[0] && response[0].status === 201) {
  //   alert('Thank you for your answer!')
  //   onAddAnswer(false);
  // }
  return (((response === null) || response.length === 0)) && (
    <div className={qnaStyles['modal-content']}>
      <h3> Submit your Answer</h3>
      <h6>
        {`${productInfo.name}: ${questionInfo.body}`}
      </h6>
      <form onSubmit={onSubmit}>
        <div className="answer-form-group">
          <label htmlFor="answer-input">Answer:</label>
          <input type="text" id="answer" name="answer" rows="3" required maxLength="1000" />
        </div>
        <div className="answer-form-group">
          <label htmlFor="nickname-input">Nickname:</label>
          <input type="text" id="nickname-input" required maxLength="60" placeholder="Example: Jack543!" />
          <p>For privacy reasons, do not use your full name or email address.</p>
        </div>
        <div className="answer-form-group">
          <label htmlFor="email-input">Email:</label>
          <input type="email" id="email-input" name="email" required maxLength="60" placeholder="Example: jack@example.com" />
          <p>For authentication reasons, you will not be emailed.</p>
        </div>
        <div className="photos">
          <input type="button" value="Upload Photos" />
          <div className="photos-view">
            <img src="image1.jpg" alt="supplement to the answer" />
            <img src="image2.jpg" alt="supplement to the answer" />
            <img src="image3.jpg" alt="supplement to the answer" />
          </div>
        </div>
        <input type="submit" value="Submit Answer" />
        {loading && <div> Submitting the answer...</div>}
        {error && <div>Error has occurred. Please try again.</div>}
      </form>
      <input type="button" className={qnaStyles['close-modal']} onClick={() => { onAdd('answer', false); }} value="X" />
    </div>
  );
}

export default AnswerForm;
