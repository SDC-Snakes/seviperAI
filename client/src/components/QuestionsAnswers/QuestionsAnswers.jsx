import React from 'react';
import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import AnswerModalWindow from './answerModal/AnswerModalWindow';

function QuestionsAnswers() {
  return (
    <div>
      <h2>Main Q&A Div</h2>
      <Search />
      <QuestionsList />
      <AnswerModalWindow />
    </div>
  );
}

export default QuestionsAnswers;
