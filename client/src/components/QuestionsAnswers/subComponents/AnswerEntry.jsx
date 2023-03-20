import React from 'react';

function AnswerEntry({ answer }) {
  return (
    <div className="answer-entry">
      <div className="answer-text">
        {answer.body}
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
