import React from 'react';
import StyleImage from './StyleImage';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'

function StyleList() {
  let { styles } = useSelector((state) => state.products);

  return (
    <div className="flex">
      {styles.map((style) => (
        <StyleImage
          image={style.photos[0].thumbnail_url}
          key={nanoid()}
          style={style}
        />
      ))}
    </div>
  );
}

export default StyleList;
