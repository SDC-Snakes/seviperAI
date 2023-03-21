import React from 'react';
import QuestionEntry from './QuestionEntry';
import AnswersList from './AnswersList';
import { answersSample } from '../sampleData';

function QnASet({ question }) {

  return (
    <div className="qna-set">
      <QuestionEntry question={question} />
      <AnswersList answers={answersSample.results} />
    </div>
  );
}

export default QnASet;
