import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import useAsync from '../useAsync';
import { QnaStyles } from '../QuestionsAnswers';
import HelpfulModule from './HelpfulModule';

function AnswerEntry({ answer }) {
  const qnaStyles = useContext(QnaStyles);
  const [reqObjs, setReqObjs] = useState(Function);
  const [reportButtonText, setReportButtonText] = useState('Report');
  const [reportButtonStatus, setReportButtonStatus] = useState(false);
  const { state: { loading, response, error } } = useAsync(reqObjs, [reqObjs]);

  // deconstruct answer prop
  const { answerer_name, body, date, helpfulness, id } = answer;

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
  console.log(answer.answerer_name);

  return (
    <span>
      <div className={qnaStyles['qna-tile']}>
        <div>{body}</div>
        <div>
          <span>
            {answerer_name === 'Seller'
              ? <strong>{answerer_name}</strong>
              : <text>{answerer_name}</text>}
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
