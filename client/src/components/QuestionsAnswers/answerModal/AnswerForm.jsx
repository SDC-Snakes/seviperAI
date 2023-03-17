import React from 'react';

function AnswerForm() {
  return (
    <form>
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
    </form>
  );
}

export default AnswerForm;
