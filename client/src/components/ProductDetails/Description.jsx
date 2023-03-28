import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { FaRegCheckCircle } from 'react-icons/fa';

function Description({ details }) {
  // let { details } = useSelector((state) => state.products);

  return (
    <div className="description flex">
      <div className="description-card center">
        <h3>{details.slogan}</h3>
        {details.description}
      </div>
      <div className="features-card">
        <ol>
          {details.features.map((item) => {
            const { feature, value } = item;
            return value ? (
              <li className="feature-item center" key={nanoid()}>
                <FaRegCheckCircle />
                &nbsp;
                {`  ${feature}  :  ${value}`}
              </li>
            ) : null;
          })}
        </ol>
      </div>
    </div>
  );
}

export default Description;
