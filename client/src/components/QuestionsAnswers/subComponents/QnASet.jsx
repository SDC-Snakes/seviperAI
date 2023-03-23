import React, { useContext } from 'react';
import { QnaStyles } from '../QuestionsAnswers'
import QuestionEntry from './QuestionEntry';
import AnswersList from './AnswersList';

function QnASet({ question }) {
  const qnaStyles = useContext(QnaStyles);
  return (
    <div className={qnaStyles['qna-tile']}>
      <QuestionEntry question={question} />
      <AnswersList answers={question.answers} />
    </div>
  );
}

export default QnASet;
