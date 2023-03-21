import React from 'react';
import QnASet from './QnASet';

function QuestionsList({ questions, numberOfQs }) {
  return (
    <div id="questions-list">
      {questions.slice(0, numberOfQs).map((question) => (
        <QnASet question={question} key={questions.question_id} />))}
    </div>
  );
}

export default QuestionsList;
