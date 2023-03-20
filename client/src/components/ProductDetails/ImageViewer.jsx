import React from 'react';
import { newSelectedStyle } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';

function ImageViewer() {
  let { selectedStyle, styles } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="inline">
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
