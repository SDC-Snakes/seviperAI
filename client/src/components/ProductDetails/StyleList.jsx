import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import StyleImage from './StyleImage';
import { useSelector } from 'react-redux';

function StyleList() {
  const { styles } = useSelector((state) => state.products);

  return (
    <div className="flex containCircles">
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
