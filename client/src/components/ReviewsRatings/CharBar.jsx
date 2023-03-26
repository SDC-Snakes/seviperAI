import React from 'react';
import { useSelector } from 'react-redux';
import { FaSortDown } from 'react-icons/fa';
import charCSS from './CharBarCSS.module.css';

function CharBar() {
  const { meta } = useSelector((state) => state.reviews);
  const charObj = meta.characteristics;
  const charKeys = Object.keys(charObj);
  const charRateValues = {
    Size: ['A size too small', 'A size too wide'],
    Width: ['Too narrow', 'Too wide'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs short', 'Runs long'],
    Fit: ['Runs tight', 'Runs Long'],
  };
  return (
    <div>
      {charKeys.map((char) => (
        <div className={charCSS['char-major-container']} key={charObj[char].id}>
          <div className={charCSS['char-bar-label']}>
            {`(${char})`}
          </div>
          <div className={charCSS['char-bar-container']}>
            <div className={charCSS['char-bar']}>
              <FaSortDown className={charCSS['char-bar-icon']} style={{ marginLeft: `${((charObj[char].value / 5) * 100)}%` }} />
            </div>
          </div>
          <div>
            <span className={charCSS['char-1']}>{charRateValues[char][0]}</span>
            <span className={charCSS['char-5']}>{charRateValues[char][1]}</span>

          </div>
        </div>
      ))}

    </div>

  );
}

export default CharBar;
