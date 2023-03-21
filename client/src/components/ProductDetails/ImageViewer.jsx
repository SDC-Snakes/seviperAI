import React, { useEffect } from 'react';
import { newSelectedImage, toggleState, newImageIndex, handleStateUpdate } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import {FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaExpand, FaCompress} from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';
import errorImage from '../SharedComponents/errorImage.jpg';

function ImageViewer() {
  const {
    selectedStyle,
    expanded,
    imageIndex,
    page,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleImageClick = (image, ind) => {
    dispatch(newSelectedImage(image.url));
    dispatch(newImageIndex(ind));
  };

  const handleHorizontalScroll = (direction) => {
    if (direction === 'left') {
      if (Math.floor((imageIndex - 1) / 7) !== page) {
        dispatch(handleStateUpdate({ name: 'page', value: page - 1 }));
      }
      dispatch(handleStateUpdate({ name: 'imageIndex', value: imageIndex - 1 }));
    } else {
      if (Math.floor((imageIndex + 1) / 7) !== page) {
        dispatch(handleStateUpdate({ name: 'page', value: page + 1 }));
      }
      dispatch(handleStateUpdate({ name: 'imageIndex', value: imageIndex + 1 }));
    }
  };

  const sideImages = () => selectedStyle.photos.map((photo, ind) => {
    if (ind - (7 * page) >= 0 && ind - (7 * page) <= 6) {
      return (
        <button className="buttonWrap" onClick={() => handleImageClick(photo, ind)} type="button" key={nanoid()}>
          <img className={photo.url === selectedStyle.photos[imageIndex].url ? 'selectedSideImage' : 'sideImage'} src={photo.thumbnail_url ? photo.thumbnail_url : errorImage} alt="ImageView" height="40" width="auto" />
        </button>
      );
    }
    return null;
  });

  return (
    <div className={expanded ? 'expanded' : 'inline'}>
      <button type="button" className="topRight buttonWrap" onClick={() => { dispatch(toggleState('expanded')); }}>
        {expanded ? <FaCompress /> : <FaExpand /> }
      </button>

      <div className="sideGrid">
        {page > 0 ? <FaChevronUp onClick={() => dispatch(handleStateUpdate({ name: 'page', value: page - 1 }))} /> : null}
        {sideImages()}
        {page < ((selectedStyle.photos.length / 7) - 1)
          ? <FaChevronDown onClick={() => dispatch(handleStateUpdate({ name: 'page', value: page + 1 }))} />
          : null}
      </div>
      <div>
        {imageIndex > 0 ? <FaChevronLeft onClick={() => handleHorizontalScroll('left')} /> : null}
        { Object.keys(selectedStyle).length > 0 ? <img className="mainImage" src={selectedStyle.photos[imageIndex].url || errorImage} alt="SelectedImage" key={selectedStyle.style_id} /> : null }
        {imageIndex < selectedStyle.photos.length - 1 ? <FaChevronRight onClick={() => handleHorizontalScroll('right')} /> : null}
      </div>
    </div>
  );
}

export default ImageViewer;
