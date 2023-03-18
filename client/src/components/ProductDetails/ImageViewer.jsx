import React from 'react';

function ImageViewer({ styles }) {
  return (
    <div>
      {styles.map((style) => <img src={style.photos[0].url} alt="ImageView" key={style.photos[0].url.slice(35, 50)} height="180" width="auto" />)}
    </div>
  );
}

export default ImageViewer;
