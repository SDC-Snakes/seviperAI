import React from 'react';
import { FaShoppingCart, FaCircleNotch } from 'react-icons/fa';

function Spinner({ context }) {
  return (
    context === 'landing'
      ? (
        <div className="center">
          <div className="loading-spinner">
            <FaShoppingCart size={50} fill="#804BAC" />
          </div>
          <br />
          <br />
          <h1>Loading...</h1>
        </div>
      )
      : (
        <div className="center">
          <div className="loading-spinner">
            <FaCircleNotch size={50} fill="#804BAC" />
          </div>
          <br />
          <br />
          <h1>Loading...</h1>
        </div>
      )
  );
}

export default Spinner;
