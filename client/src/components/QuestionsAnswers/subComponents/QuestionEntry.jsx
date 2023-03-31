import React, { useContext } from 'react';
import HelpfulModule from './HelpfulModule';
import { OnAddAnswer } from '../QuestionsAnswers';
import qnaStyles from '../qnaStyles.module.css';

function QuestionEntry({ question }) {
  const onAdd = useContext(OnAddAnswer);

  return (
    <div className={qnaStyles["question-entry"]}>
      <span style={{width:"10px", "margin-right":"10px"}}> Q: </span>
      <span className={qnaStyles["question-text"]}>
        {question.question_body}
      </span>
      <HelpfulModule
        count={question.question_helpfulness}
        itemId={question.question_id}
        item="questions"
      />
      <input
        type="button"
        className={qnaStyles["add-answer-button"]}
        onClick={() => onAdd('answer', true, false, question.question_id, question.question_body)}
        value="Add Answer"
        aria-label="add-answer"
      />
    </div>
  );
}

export default QuestionEntry;
