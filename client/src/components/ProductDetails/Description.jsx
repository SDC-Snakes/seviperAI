import React from 'react';
// import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'

function Description({ details }) {
  // let { details } = useSelector((state) => state.products);

  return (
    <div className="flex">
      <div className="description-card center">
        <h3>{details.slogan}</h3>
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
