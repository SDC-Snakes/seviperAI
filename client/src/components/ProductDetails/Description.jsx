import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'

function Description() {
  let { details } = useSelector((state) => state.products);

  return (
    <div className="flex">
      <div>
        {details.description}
      </div>
      <div>
        <ol>
          {details.features.map((item) => {
            const { feature, value } = item;
            return value ? <li key={nanoid()}>{`${feature} : ${value}`}</li> : null;
          })}
        </ol>
      </div>
    </div>
  );
}

export default Description;
