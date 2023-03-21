import React, { useContext } from 'react';
import HelpfulModule from './HelpfulModule';
import { OnAddAnswer } from '../QuestionsAnswers';

function QuestionEntry({ question }) {
  const onAddAnswer = useContext(OnAddAnswer);

  return (
    <div className="question-entry">
      <span className="q">
        Q:
      </span>
      <span>
        <span className="question-text">
          {question.question_body}
        </span>
        <HelpfulModule count={question.question_helpfulness} onClick={() => console.log('HELPFUL')} />
        <input type="button" className="add-answer-button" onClick={() => onAddAnswer(true, question.id, question.question_body)} value="Add Answer" />
      </span>
    </div>
  );
}

export default QuestionEntry;
