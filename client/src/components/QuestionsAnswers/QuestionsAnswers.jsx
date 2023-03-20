import React, { useState } from 'react';
// import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
// import AnswerModalWindow from './answerModal/AnswerModalWindow';
import { questionsSample } from './sampleData';

function QuestionsAnswers() {
  const [questions, setQuestions] = useState(questionsSample);

  return (
    <div>
      <h2>Main Q&A Div</h2>
      {/* <Search /> */}
      <QuestionsList questions={questions} />
      {/* <AnswerModalWindow /> */}
    </div>
  );
}

export default QuestionsAnswers;
