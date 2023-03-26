import React from 'react';
import QnaForm from './QnaForm';

function WindowWrapper({
  qnaStyles, onAdd, productInfo, questionInfo, form,
}) {
  // const [reqStatus, setReqStatus] = useState(false);
  return (
    <div className="answer-modal-window">
      <div className={qnaStyles.modal}>
        <div className={qnaStyles.overlay}>
          <QnaForm
            qnaStyles={qnaStyles}
            onAdd={onAdd}
            productInfo={productInfo}
            questionInfo={questionInfo}
          />
        </div>
      </div>
    </div>
  );
}

export default WindowWrapper;
