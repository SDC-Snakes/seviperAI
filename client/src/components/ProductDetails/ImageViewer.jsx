import React from 'react';

function ImageViewer({ styles }) {
  return (
    <div>
      <img src={styles.photos[0].url} alt="ImageView" height="180" width="120" />

      {/* {Object.keys(styles).map((style) => {

      })} */}
    </div>
  );
}

export default ImageViewer;
