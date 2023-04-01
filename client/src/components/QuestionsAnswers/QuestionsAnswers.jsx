import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import WindowWrapper from './ModalWindow/WindowWrapper';
import qnaStyles from './qnaStyles.module.css';
import { useGetQuestionsQuery } from '../../features/api/apiSlice';

// create and export css as a context object
export const QnaStyles = React.createContext(null);
export const OnAddAnswer = React.createContext(null);
export const SendRequestAsync = React.createContext(null);

function QuestionsAnswers() {
  const params = useParams(); // get productId
  // need to declare all the state variables on the top
  const [numberOfQs, setNumberOfQs] = useState(2);
  // visibility state variable for answer modal window
  const [answerFormVisible, setAnswerFormVisible] = useState(false);
  const [questionFormVisible, setQuestionFormVisible] = useState(false);
  // question state vars for answer modal
  const [questionInfo, setQuestionInfo] = useState({ id: '', body: '' });
  // state var to control re-fetch data
  const [reload, setReload] = useState(false);
  // search query
  const [query, setQuery] = useState('');
  const [timeoutID, setTimeoutID] = useState(null);
  // show only 4 questions when reloaded
  useEffect(() => setNumberOfQs(4), [reload]);

  // RTK QUERY
  // const {
  //   data: questionsRTK,
  //   // isFetchingQuestions,
  // }
  const questionsQueryParams = {
    productId: `${params.productId}`,
    page: 1,
    count: 100,
    reload,
  };
  const { data: questionsRTK,
    isError, isFetching}
    = useGetQuestionsQuery(questionsQueryParams, {
      refetchOnMountOrArgChange: true,
    });
  // fetching initial data
  /// handle loading and error
  if (isFetching) return <div> Loading...</div>;
  if (isError) return <div> Error has occurred while loading</div>;
  if (!questionsRTK) return null;

  // extract data from responses
  // sort according to helpfulness
  const sortDescHelpful = (a, b) => (b.question_helpfulness - a.question_helpfulness);
  const questions = questionsRTK.results.slice();
  questions.sort(sortDescHelpful);

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

  // live search function
  const onSearch = (e) => {
    if (e.target.value.length >= 3) {
      clearTimeout(timeoutID);
      const timeoutID2 = setTimeout(() => setQuery(e.target.value), 200);
      setTimeoutID(timeoutID2);
    } else {
      setQuery('');
    }
  }

  return (

    <QnaStyles.Provider value={qnaStyles}>
      <OnAddAnswer.Provider value={onAdd}>
        <div className={qnaStyles['qna-outer-container']}>
          <div className={qnaStyles['qna-container-main']}>
            <h4>Questions & Answers</h4>
            <Search onSearch={onSearch} />
            {questions.length === 0
              ? <div> Have a question about our products? Ask us here! </div>
              : (
                <QuestionsList
                  questions={questions}
                  numberOfQs={numberOfQs}
                  query={query}
                />
              )}
            {/* show more questions button only when there are more */}
            <div>
              {numberOfQs < questions.length
                && (
                  <input
                    type="button"
                    onClick={loadMoreQs}
                    value="More Answered Questions"
                    name="more-question"
                    className="button button-light"
                  />
                )}
              <input
                type="button"
                aria-label="add-question"
                onClick={() => { onAdd('question', true); }}
                value="Add a question +"
                className="button button-light"
              />
            </div>
            {answerFormVisible
              && (
                <WindowWrapper
                  qnaStyles={qnaStyles}
                  onAdd={onAdd}
                  questionInfo={questionInfo}
                  form="answer"
                />
              )}
            {questionFormVisible
              && (
                <WindowWrapper
                  qnaStyles={qnaStyles}
                  onAdd={onAdd}
                  form="question"
                />
              )}
          </div>
        </div>
      </OnAddAnswer.Provider>
    </QnaStyles.Provider>
  );
}

export default React.memo(QuestionsAnswers);
