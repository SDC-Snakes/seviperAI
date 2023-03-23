import React, { useContext } from 'react';
import { QnaStyles } from '../QuestionsAnswers'
import QnASet from './QnASet';

function QuestionsList({ questions, numberOfQs }) {
  const qnaStyles = useContext(QnaStyles);

  return (
    <div className={qnaStyles['questions-list-container']}id="questions-list">
      {questions.slice(0, numberOfQs).map((question) => (
        <QnASet
          question={question}
          key={question.question_id}
        />
      ))}
    </div>
  );
}

export default QuestionsList;
