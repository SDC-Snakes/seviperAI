import React from 'react';
import { newSelectedStyle, toggleState } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import {FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaExpand, FaCompress} from 'react-icons/fa';

function ImageViewer() {
  let { selectedStyle, styles, expanded } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className={expanded ? 'expanded' : 'inline'}>
      <div className="topRight" onClick={(e) => { dispatch(toggleState('expanded')); }}>
        {expanded ? <FaCompress /> : <FaExpand /> }
      </div>
      <div className="sideGrid">
        {styles.map((style) => <img className="sideImage" onClick={() => { dispatch(newSelectedStyle(style)); }} src={style.photos[0].url} alt="ImageView" key={style.style_id} height="40" width="auto" />)}
      </div>
      <div>
        { Object.keys(selectedStyle).length > 0 ? <img className="mainImage" src={selectedStyle.photos[0].url} alt="ImageView" key={selectedStyle.style_id} /> : null }
      </div>
    </div>
  );
}

export default ImageViewer;
