import React from 'react';
import QnASet from './QnASet';

function QuestionsList({ questions }) {
  return (
    <div id="questions-list">
      {questions.results.slice(0, 2).map((question) => <QnASet question={question} />)}
      <div>More Answered Questions</div>
    </div>
  );
}

export default QuestionsList;
