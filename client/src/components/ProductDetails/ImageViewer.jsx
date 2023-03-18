import React from 'react';

function ImageViewer({ styles }) {
  return (
    <div>
      {styles.map((style) => <img src={style.photos[0].url} alt="ImageView" height="180" width="auto" />)}
    </div>
  );
}

export default ImageViewer;
