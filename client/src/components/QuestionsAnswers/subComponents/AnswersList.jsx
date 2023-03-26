import React, { useState } from 'react';
import AnswerEntry from './AnswerEntry';

function AnswersList({ answers }) {
  const [answersList, setAnswersList] = useState(
    Object.values(answers).sort((a, b) => {
      return ((b.answerer_name === 'Seller') - (a.answerer_name === 'Seller')
        || b.helpfulness - a.helpfulness);
    }),
  );
  const [numberOfAs, setNumberOfAs] = useState(2);
  const [folded, setFolded] = useState(true);
  const answerFold = () => {
    setNumberOfAs(folded ? answersList.length : 2);
    setFolded(!folded);
  };
  return answersList.length > 0 && (
    <div className="answer-list" style={{ overflow: 'auto', maxHeight: '400px' }}>
      <span className="a">
        A:
      </span>
      {answersList.slice(0, numberOfAs).map((answer) => (
        <AnswerEntry answer={answer} key={answer.id} />
      ))}
      {answersList.length > 2
        && (
          <div>
            <input
              onClick={answerFold}
              value={folded ? 'See more answers' : 'Collapse answers'}
              color="blue"
              type="button"
            />

          </div>
        )}
    </div>
  );
}

export default AnswersList;
