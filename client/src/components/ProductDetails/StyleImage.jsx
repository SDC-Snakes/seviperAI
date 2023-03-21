import React from 'react';
import { newSelectedStyle, newSelectedImage, handleStateUpdate } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import errorImage from '../SharedComponents/errorImage.jpg';
import { FaCheck } from 'react-icons/fa';

function StyleImage({ image, style }) {
  const { selectedStyle, imageIndex, page } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const current = style.style_id === selectedStyle.style_id;

  const handleClick = () => {
    const len = style.photos.length;
    dispatch(newSelectedStyle(style));
    if (imageIndex < len) {
      dispatch(newSelectedImage(style.photos[imageIndex].url));
    } else {
      dispatch(newSelectedImage(style.photos[len - 1].url));
      dispatch(handleStateUpdate({ name: 'imageIndex', value: len - 1 }));
    }
    if ((page > Math.floor(len / 7))) {
      dispatch(handleStateUpdate({ name: 'page', value: Math.floor(len / 7) }));
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
