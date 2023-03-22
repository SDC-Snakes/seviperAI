import React from 'react';
import AnswerForm from './AnswerForm';

function WindowWrapper({
  qnaStyles, onAddAnswer, productInfo, questionInfo,
}) {
  // const [reqStatus, setReqStatus] = useState(false);
  return (
    <div className="answer-modal-window">
      <div className={qnaStyles.modal}>
        <div className={qnaStyles.overlay}>
          <AnswerForm
            qnaStyles={qnaStyles}
            onAddAnswer={onAddAnswer}
            productInfo={productInfo}
            questionInfo={questionInfo}
          />
        </div>
      </div>
    </div>
  );
}

export default WindowWrapper;
