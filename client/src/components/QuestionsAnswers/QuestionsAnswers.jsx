import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
// import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
// import AnswerModalWindow from './answerModal/AnswerModalWindow';
import { questionsSample } from './sampleData';

const productId = '40344'; // LATER, SAMPLE NUMBER

function QuestionsAnswers() {
  const params = useParams();
  const sortDescHelpful = (a, b) => (b.question_helpfulness - a.question_helpfulness);
  // sort according to helpfulness
  // const [questions, setQuestions] = useState(questionsSample.results.sort(sortDescHelpful));
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // need to declare all the state variables on the top
  const [numberOfQs, setNumberOfQs] = useState(2);

  useEffect(() => {
    setError(null);
    setQuestions(null);
    setLoading(true);
    axios.get('http://localhost:8080/qa/questions/', {
      params: {
        product_id: params.productId,
        page: 1,
        count: 100,
      }
    })
      .then((response) => {
        console.log('QQQQ',response.data);
        setQuestions(response.data.results.sort(sortDescHelpful));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
  }, []);

  if (loading) return <div> Loading...</div>
  if (error) return <div> Error has occurred while loading</div>
  if (!questions) return null;

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
