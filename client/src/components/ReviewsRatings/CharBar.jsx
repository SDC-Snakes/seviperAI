// this component will render the characteristics bars for the current product
// use meta data
// not all characteristics are relevant for each product
// will need similar css styling to that of rating bars
// first off handle data
// then css

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import charCSS from './CharBarCSS.module.css';
import { FaSortDown } from 'react-icons/fa';

function CharBar() {
  const { meta } = useSelector((state) => state.reviews);
  const charObj = meta.characteristics;
  const charKeys = Object.keys(charObj);

  // end of copy

  return (
    <div>
      {charKeys.map((char) => (
        <div key={charObj[char].id}>
          {/* <div key={charObj[char].id}>
            characteristic: {char}
            id:{charObj[char].id}
            value:{charObj[char].value}
            percentage: {(charObj[char].value / 5) * 100}%
          </div> */}
          {/* // a bar
          // rating values at 1 3 and 5 stars
          // */}

          <div className={charCSS['char-bar-container']}>
            <div>
            {`(${char})`}
            </div>
            <div className={charCSS['char-bar']}>

              <FaSortDown className={charCSS['char-bar-icon']} style={{ marginLeft: `${((charObj[char].value / 5) * 100)  }%` }} />

            </div>

          </div>

        </div>
      ))}

    </div>

  );
}

export default CharBar;
