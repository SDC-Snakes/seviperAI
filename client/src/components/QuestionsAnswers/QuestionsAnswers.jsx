import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import AnswerModalWindow from './answerModal/AnswerModalWindow';
import useAsync from './useAsync';
import qnaStyles from './qnaStyles.module.css';

// create and export css as a context object
export const QnaStyles = React.createContext(null);
export const productName = React.createContext(null);

function QuestionsAnswers() {
  const params = useParams(); // to get productId
  // sort according to helpfulness
  const sortDescHelpful = (a, b) => (b.question_helpfulness - a.question_helpfulness);

  // need to declare all the state variables on the top
  const [numberOfQs, setNumberOfQs] = useState(2);
  // visibility state variable for answer modal window
  const [answerFormVisible, setAnswerFromVisible] = useState(true);

  // fetching initial data
  /// handle loading and error
  const reqObj = axios.get('http://localhost:8080/qa/questions/', {
    params: {
      product_id: params.productId,
      page: 1,
      count: 100,
    },
  });

  // custom hook to handle requests
  const { loading, response, error } = useAsync(reqObj, []);

  // handle loading state;
  if (loading) return <div> Loading...</div>;
  if (error) return <div> Error has occurred while loading</div>;
  if (!response) return null;

  // extract and sort questions array
  const questions = response.data.results.sort(sortDescHelpful);
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
