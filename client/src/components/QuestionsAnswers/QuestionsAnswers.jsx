import React, { useState } from 'react';
// import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
// import AnswerModalWindow from './answerModal/AnswerModalWindow';
import { questionsSample } from './sampleData';

const productId = '40344'; // LATER, SAMPLE NUMBER

function QuestionsAnswers() {
  const sortDescHelpful = (a, b) => (b.question_helpfulness - a.question_helpfulness);
  // sort according to helpfulness
  const [questions, setQuestions] = useState(questionsSample.results.sort(sortDescHelpful));
  const [numberOfQs, setNumberOfQs] = useState(2);

  const loadMoreQs = () => {
    setNumberOfQs(Math.min(numberOfQs + 2, questions.length));
  };

  return (
    <div>
      <h2>Main Q&A Div</h2>
      {/* <Search /> */}
      <QuestionsList questions={questions} numberOfQs={numberOfQs} />
      {numberOfQs < questions.length
        && (
          <div>
            <b
              style={{ cursor: 'pointer' }}
              onClick={loadMoreQs}
              role="button"
              onKeyPress={loadMoreQs}
              tabIndex={0}
            >
              More Answered Questions
            </b>
          </div>
        )}
      {/* <AnswerModalWindow /> */}
    </div>
  );
}

export default QuestionsAnswers;
