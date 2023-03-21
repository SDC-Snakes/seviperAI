import React from 'react';
import { newSelectedStyle, newSelectedImage } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import errorImage from '../SharedComponents/errorImage.jpg';
import { FaCheck } from 'react-icons/fa';

function StyleImage({ image, style }) {
  const { selectedStyle, imageIndex } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const current = style.style_id === selectedStyle.style_id;

  const handleClick = () => {
    dispatch(newSelectedStyle(style));
    if (imageIndex < style.photos.length) {
      dispatch(newSelectedImage(style.photos[imageIndex].url));
    } else {
      dispatch(newSelectedImage(style.photos[style.photos.length - 1].url));
    }
  };

  return (
    <div className="flex">
      <button className="buttonWrap" onClick={handleClick} type="button">
        <img className={current ? 'selected' : 'circleImage'} src={image || errorImage} alt="ImageView" height="40" width="auto" />
        <FaCheck className={current ? 'visible' : 'invisible'} />
      </button>
    </div>
  );
}

export default StyleImage;
