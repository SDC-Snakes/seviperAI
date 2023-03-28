import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { QnaStyles } from '../QuestionsAnswers';
import HelpfulModule from './HelpfulModule';
import { useReportAnswerMutation } from '../../../features/api/apiSlice';

function AnswerEntry({ answer }) {
  const qnaStyles = useContext(QnaStyles);
  const [reportButtonText, setReportButtonText] = useState('Report');
  const [reportButtonStatus, setReportButtonStatus] = useState(false);
  const [triggerReport, { isSuccess, reset }] = useReportAnswerMutation();
  // deconstruct answer prop
  const { answerer_name, body, date, helpfulness, id } = answer;

  if (isSuccess) {
    setReportButtonText('Reported');
    setReportButtonStatus(true);
    reset();
  }

  const onReport = () => {
    triggerReport(id);
  };

  return (
    <span>
      <div className={qnaStyles['qna-tile']}>
        <div>{body}</div>
        <div>
          <span>
            {answerer_name === 'Seller'
              ? <strong>{answerer_name}</strong>
              : <span>{answerer_name}</span>}
          </span>
          <span>
            <small>
              {format(new Date(date), 'MMMM dd yyyy')}
            </small>

          </span>
        </div>

      </div>
      <HelpfulModule
        count={helpfulness}
        itemId={id}
        item="answers"
      />
      <input
        type="button"
        className="report-button"
        value={reportButtonText}
        onClick={onReport}
        disabled={reportButtonStatus}
      />
    </span>
  );
}

export default AnswerEntry;
