import React from 'react';
import { newSelectedStyle } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';

function StyleImage({ image, style }) {
  const dispatch = useDispatch();

  return (
    <div>
      <img className="circleImage" src={image} alt="ImageView" height="40" width="auto" onClick={() => { dispatch(newSelectedStyle(style)); }}/>
    </div>
  );
}

export default StyleImage;
