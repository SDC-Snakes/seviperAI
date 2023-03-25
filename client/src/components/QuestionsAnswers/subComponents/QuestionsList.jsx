import React, { useContext } from 'react';
import { QnaStyles } from '../QuestionsAnswers'
import QnASet from './QnASet';

function QuestionsList({ questions, numberOfQs, query }) {
  const qnaStyles = useContext(QnaStyles);
  questions = questions.filter((question) => question.question_body.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className={qnaStyles['questions-list-container']}id="questions-list" style={{ overflow: 'auto', maxHeight: '800px' }}>
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
