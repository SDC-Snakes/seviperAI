import React from 'react';
import AnswerForm from './AnswerForm';
import QuestionForm from './QuestionForm';
import QnaForm from './QnaForm';

function WindowWrapper({
  qnaStyles, onAdd, productInfo, questionInfo, form,
}) {
  // const [reqStatus, setReqStatus] = useState(false);
  return (
    <div className="answer-modal-window">
      <div className={qnaStyles.modal}>
        <div className={qnaStyles.overlay}>
          {/* {form === 'answer'
            && (
            <AnswerForm
              qnaStyles={qnaStyles}
              onAdd={onAdd}
              productInfo={productInfo}
              questionInfo={questionInfo}
            />
            )}
          {form === 'question'
            && (
            <QuestionForm
              qnaStyles={qnaStyles}
              onAdd={onAdd}
              productInfo={productInfo}
            />
            )} */}
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
