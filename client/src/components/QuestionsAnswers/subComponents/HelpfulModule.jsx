import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAsync from '../useAsync';

function HelpfulModule({ count, itemId, item }) {
  const [countTemp, setCountTemp] = useState(count);
  const [reqObjs, setReqObjs] = useState(Function);
  const { state: { loading, response, error } } = useAsync(reqObjs, [reqObjs]);

  useEffect(() => {
    if (response !== null && response[0] && response[0].status === 204) {
      setCountTemp(countTemp + 1);
      setReqObjs(Function);
    }
  });

  const onClick = () => {
    setReqObjs(() => function putRequest() {
      return [
        axios.put(`http://localhost:${process.env.PORT}/qa/${item}/${itemId}/helpful`),
      ];
    });
  };

  return (
    <>
      <span className="helpful-text">
        Helpful?
      </span>
      <span className="yes-button" onClick={onClick}>
        Yes(
        {countTemp}
        )
      </span>
    </>
  );
}

export default HelpfulModule;
