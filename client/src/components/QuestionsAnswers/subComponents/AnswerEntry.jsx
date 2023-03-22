import React from 'react';
import HelpfulModule from './HelpfulModule';

function AnswerEntry({ answer }) {
  return (
    <span className="answer-entry">
      <div className="answer-text">
        {answer.body}
      </div>
      <HelpfulModule count={answer.helpfulness} onClick={() => console.log('helpful ANSWER')} />
      <input type="button" className="report-button" value="Report" />
    </span>
  );
}

export default AnswerEntry;
