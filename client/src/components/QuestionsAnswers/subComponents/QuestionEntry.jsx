import React, { useContext } from 'react';
import HelpfulModule from './HelpfulModule';
import { OnAddAnswer } from '../QuestionsAnswers';
import qnaStyles from '../qnaStyles.module.css';

function QuestionEntry({ question }) {
  const onAdd = useContext(OnAddAnswer);

  return (
    <div className={qnaStyles["question-entry"]}>
      <span style={{width:"10px", "marginRight":"10px"}}> Q: </span>
      <span className={qnaStyles["question-text"]}>
        {question.question_body}
      </span>
      <span className={qnaStyles["question-buttons"]}>
        <HelpfulModule
          count={question.question_helpfulness}
          itemId={question.question_id}
          item="questions"
        />
        <span
          className={qnaStyles['helpful-tile']}
          onClick={() => onAdd('answer', true, false, question.question_id, question.question_body)}
          aria-label="add-answer"
          style={{textDecoration: "underline"}}
        >
          Add Answer
        </span>
      </span>
    </div>
  );
}

export default QuestionEntry;
