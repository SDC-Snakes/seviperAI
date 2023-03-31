import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  newSelectedImage,
  newImageIndex,
} from '../../features/products/productsSlice';

function SideImages() {
  const {
    selectedStyle,
    imageIndex,
    page,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleImageClick = (image, ind) => {
    dispatch(newSelectedImage(image.url));
    dispatch(newImageIndex(ind));
  };

  return (
    <>
      {
        selectedStyle.photos.map((photo, ind) => {
          if (ind - (7 * page) >= 0 && ind - (7 * page) <= 6) {
            return (
              <button className="buttonWrap" aria-label="side-img" onClick={() => handleImageClick(photo, ind)} type="button" key={nanoid()}>
                <img className={photo.url === selectedStyle.photos[imageIndex].url ? 'selectedSideImage' : 'sideImage'} src={photo.thumbnail_url ? photo.thumbnail_url : null} alt="Side" height="40" width="40" />
              </button>
            );
          }
          return null;
        })
   }
    </>
  );
}

export default SideImages;
