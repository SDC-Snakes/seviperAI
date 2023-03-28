import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaExpand,
  FaCompress,
} from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';
import {
  newSelectedImage,
  toggleState,
  newImageIndex,
  handleStateUpdate,
} from '../../features/products/productsSlice';
import errorImage from '../SharedComponents/errorImage.jpg';

function ImageViewer() {
  const {
    selectedStyle,
    expanded,
    zoom,
    imageIndex,
    page,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const [dimensions, setDimensions] = useState([]);
  const [relPosition, setRelPosition] = useState([]);

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

  const sideImages = () => (
    selectedStyle.photos.map((photo, ind) => {
      if (ind - (7 * page) >= 0 && ind - (7 * page) <= 6) {
        return (
          <button className="buttonWrap" aria-label="side-img" onClick={() => handleImageClick(photo, ind)} type="button" key={nanoid()}>
            <img className={photo.url === selectedStyle.photos[imageIndex].url ? 'selectedSideImage' : 'sideImage'} src={photo.thumbnail_url ? photo.thumbnail_url : errorImage} alt="ImageView" height="40" width="auto" />
          </button>
        );
      }
      return null;
    })
  );

  const handleZoom = () => {
    if (zoom === false) {
      const newArray = [imgRef.current.clientWidth, imgRef.current.clientHeight];
      setDimensions(newArray);
    }
    dispatch(toggleState('zoom'));
    dispatch(toggleState('expanded'));
  };

  const mousePos = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    let relLeft = (e.clientX - bounds.left) * 1.5;
    const relTop = (e.clientY - bounds.top) * 1.5;
    if (relLeft < 0) {
      relLeft = 0;
    }
    setRelPosition([relLeft, relTop]);
  };

  return (
    zoom && !expanded
      ? (
        <div className="imageViewPort expanded center">
          <button className="imgContainer" type="button" aria-label="image-window" onClick={handleZoom} onMouseMove={mousePos} style={{ width: `${dimensions[0]}px`, height: `${dimensions[1]}px`, overflow: 'hidden' }}>
            <div style={{
              width: `${dimensions[0] * 4}px`, height: `${dimensions[1] * 4}px`, overflow: 'hidden', cursor: 'zoom-out', position: 'relative', left: `${-1.5 * dimensions[0]}px`, top: `${-1.5 * dimensions[1]}px`,
            }}
            >
              <img
                src={selectedStyle.photos[imageIndex].url || errorImage}
                alt="SelectedImage"
                key={selectedStyle.style_id}
                style={{
                  width: `${dimensions[0] * 2.5}px`, height: `${dimensions[1] * 2.5}px`, position: 'relative', bottom: `${relPosition[1] - (dimensions[1] * 1.495)}px`, right: `${relPosition[0] - (dimensions[0] * 0.74)}px`, objectFit: 'cover',
                }}
              />
            </div>
          </button>
        </div>
      )
      : (
        <div className="imageView">
          <button type="button" className="topRight buttonWrap" data-testid="expandBtn" onClick={() => { dispatch(toggleState('expanded')); }}>
            {expanded ? <FaCompress /> : <FaExpand /> }
          </button>
          <div className={expanded ? 'expanded' : 'inline'}>
            <div className="sideGrid">
              {page > 0 ? <FaChevronUp className="chevron" data-testid="chevron-icon" onClick={() => dispatch(handleStateUpdate({ name: 'page', value: page - 1 }))} /> : null}
              {sideImages()}
              {page < ((selectedStyle.photos.length / 7) - 1)
                ? <FaChevronDown className="chevron" aria-label="down-arrow" data-testid="chevron-icon" onClick={() => dispatch(handleStateUpdate({ name: 'page', value: page + 1 }))} />
                : null}
            </div>
            <div className="center">
              {imageIndex > 0 ? <FaChevronLeft className="chevron" aria-label="left-arrow" data-testid="chevron-icon" onClick={() => handleHorizontalScroll('left')} /> : null}
              <button className={expanded ? 'buttonWrap' : 'buttonWrap noClick'} type="button" aria-label="image-window" onClick={expanded ? handleZoom : null} ref={imgRef}>
                <img className={expanded ? 'expandedImage' : 'mainImage'} aria-label="main-image" src={selectedStyle.photos[imageIndex].url || errorImage} alt="SelectedImage" key={selectedStyle.style_id} />
              </button>
              {imageIndex < selectedStyle.photos.length - 1 ? <FaChevronRight className="chevron" data-testid="chevron-icon" aria-label="right-arrow" onClick={() => handleHorizontalScroll('right')} /> : null}
            </div>
          </div>
        </div>
      )

  );
}

export default ImageViewer;
