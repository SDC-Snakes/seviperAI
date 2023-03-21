import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import AnswerModalWindow from './answerModal/AnswerModalWindow';
import qnaStyles from './qnaStyles.module.css';

// create and export css as a context object
export const QnaStyles = React.createContext(null);

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
  // visibility state variable for answer modal window
  const [answerFormVisible, setAnswerFromVisible] = useState(true);

  // fetching initial data
  /// handle loading and error
  useEffect(() => {
    setError(null);
    setQuestions(null);
    setLoading(true);
    axios.get('http://localhost:8080/qa/questions/', {
      params: {
        product_id: params.productId,
        page: 1,
        count: 100,
      },
    })
      .then((response) => {
        setQuestions(response.data.results.sort(sortDescHelpful));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div> Loading...</div>;
  if (error) return <div> Error has occurred while loading</div>;
  if (!questions) return null;
  // function for loading more questions
  const loadMoreQs = () => {
    setNumberOfQs(Math.min(numberOfQs + 2, questions.length));
  };

  return (

    <QnaStyles.Provider value={qnaStyles}>
      <div>
        <h2>Main Q&A Div</h2>
        {/* <Search /> */}
        <QuestionsList questions={questions} numberOfQs={numberOfQs} />
        {/* show more questions button only when there are more */}
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
        {answerFormVisible && <AnswerModalWindow qnaStyles={qnaStyles} />}
      </div>
    </QnaStyles.Provider>
  );
}

export default QuestionsAnswers;
