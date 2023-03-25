import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import useAsync from '../useAsync';
import { QnaStyles } from '../QuestionsAnswers'
import HelpfulModule from './HelpfulModule';

function AnswerEntry({ answer }) {
  const qnaStyles = useContext(QnaStyles);
  const [reqObjs, setReqObjs] = useState(Function);
  const [reportButtonText, setReportButtonText] = useState('Report');
  const [reportButtonStatus, setReportButtonStatus] = useState(false);
  const { state: { loading, response, error } } = useAsync(reqObjs, [reqObjs]);

  useEffect(() => {
    if (response !== null && response[0] && response[0].status === 204) {
      setReportButtonText('Reported');
      setReportButtonStatus(true);
      setReqObjs(Function);
    }
  });

  const onReport = () => {
    setReqObjs(() => function putRequest() {
      return [
        axios.put(`http://localhost:${process.env.PORT}/qa/answers/${answer.id}/report`),
      ];
    });
  };
  console.log(answer);

  return (
    <span>
      <div className={qnaStyles['qna-tile']}>
        <div>{answer.body}</div>
        <div>a</div>

      </div>
      <HelpfulModule
        count={answer.helpfulness}
        itemId={answer.id}
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
