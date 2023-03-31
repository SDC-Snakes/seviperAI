import React from 'react';
import qnaStyles from '../qnaStyles.module.css';
import QuestionEntry from './QuestionEntry';
import AnswersList from './AnswersList';

function QnASet({ question }) {
  return (
    <div className={qnaStyles['qna-tile']}>
      <QuestionEntry question={question} />
      <AnswersList answers={question.answers} />
    </div>
  );
}

export default QnASet;
