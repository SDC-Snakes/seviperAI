import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import WindowWrapper from './ModalWindow/WindowWrapper';
import useAsync from './useAsync';
import qnaStyles from './qnaStyles.module.css';

// create and export css as a context object
export const QnaStyles = React.createContext(null);
export const OnAddAnswer = React.createContext(null);
export const SendRequestAsync = React.createContext(null);

function QuestionsAnswers() {
  const params = useParams(); // get productId
  // need to declare all the state variables on the top
  const [numberOfQs, setNumberOfQs] = useState(4);
  // visibility state variable for answer modal window
  const [answerFormVisible, setAnswerFormVisible] = useState(false);
  const [questionFormVisible, setQuestionFormVisible] = useState(false);
  // question state vars for answer modal
  const [questionInfo, setQuestionInfo] = useState({
    id: '',
    body: '',
  });
  // state var to control re-fetch data
  const [reload, setReload] = useState(false);
  // show only 4 questions when reloaded
  useEffect(() => setNumberOfQs(4), [reload]);
  // fetching initial data
  /// handle loading and error
  const reqObjs = () => [
    // questions for a product
    axios.get(`http://localhost:${process.env.PORT}/qa/questions/`, {
      params: {
        product_id: params.productId,
        page: 1,
        count: 100,
      },
    }),
    // product info. for adding a question and answer
    axios.get(`http://localhost:${process.env.PORT}/products/${params.productId}`),
  ];

  // custom hook to handle requests
  const { state: { loading, response, error } } = useAsync(reqObjs, [reload]);

  // handle loading state;
  if (loading) return <div> Loading...</div>;
  if (error) return <div> Error has occurred while loading</div>;
  if (!response) return null;

  // extract data from responses
  // sort according to helpfulness
  const sortDescHelpful = (a, b) => (b.question_helpfulness - a.question_helpfulness);
  const questions = response[0].data.results.sort(sortDescHelpful);
  const productInfo = response[1].data;

  // function for loading more questions
  const loadMoreQs = () => {
    setNumberOfQs(Math.min(numberOfQs + 2, questions.length));
  };
  // toggle functions
  const onAdd = (item, visibleState, refetch = false, id, body) => {
    if (item === 'answer') {
      setQuestionInfo({ id, body });
      setAnswerFormVisible(visibleState);
    } else if (item === 'question') {
      setQuestionFormVisible(visibleState);
    }
    if (refetch) {
      setReload(!reload);
    }
  };

  return (

    <QnaStyles.Provider value={qnaStyles}>
      <OnAddAnswer.Provider value={onAdd}>
        <div className={qnaStyles['qna-container-main']}>
          <h2>Main Q&A Div</h2>
          <Search />
          <QuestionsList
          questions={questions}
          numberOfQs={numberOfQs} />
          {/* show more questions button only when there are more */}
          <div>
            {numberOfQs < questions.length
              && <input type="button" onClick={loadMoreQs} value="More Answered Questions" />}
            <input type="button" onClick={() => { onAdd('question', true); }} value="Add a question +" />
          </div>
          {answerFormVisible
            && (
              <WindowWrapper
                qnaStyles={qnaStyles}
                onAdd={onAdd}
                productInfo={productInfo}
                questionInfo={questionInfo}
                form="answer"
              />
            )}
          {questionFormVisible
            && (
              <WindowWrapper
                qnaStyles={qnaStyles}
                onAdd={onAdd}
                productInfo={productInfo}
                form="question"
              />
            )}
        </div>
      </OnAddAnswer.Provider>
    </QnaStyles.Provider>
  );
}

export default React.memo(QuestionsAnswers);
