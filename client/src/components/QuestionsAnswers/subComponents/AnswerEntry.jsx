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
      <input type="button" className="yes-button" value="Yes" />
      <input type="button" className="report-button" value="Report" />
    </div>
  );
}

export default AnswerEntry;
