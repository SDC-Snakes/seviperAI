import React from 'react';

function AnswerEntry() {
  return (
    <div className="answer-entry">
      <div className="answer-text">
        Hello world!
      </div>
      <div className="helpful-text">
        Helpful?
      </div>
      <button type="button" className="yes-button">Yes (5)</button>
      <button type="button" className="report-button">Report</button>
    </div>
  );
}

export default AnswerEntry;
