import React, { useContext } from 'react';
import { QnaStyles } from '../QuestionsAnswers'
import HelpfulModule from './HelpfulModule';

function AnswerEntry({ answer }) {
  const qnaStyles = useContext(QnaStyles);
  return (
    <span>
      <div className={qnaStyles['qna-tile']}>
        {answer.body}
      </div>
      <HelpfulModule count={answer.helpfulness} onClick={() => console.log('helpful ANSWER')} />
      <input type="button" className="report-button" value="Report" />
    </span>
  );
}

export default AnswerEntry;
