import React from 'react';

function ThumbnailImageModal({ RNRCSS, toggleModalImage, photo }) {
  return (
    <div className={RNRCSS['modal']}>
      <div className={RNRCSS['overlay']}>
        <div className={RNRCSS['modal-content']}>
          <h2> Image enlarged View</h2>
          <img
            className={RNRCSS['modal-image-full-size']}
            key={photo.id}
            src={photo.url}
            alt={`${photo.id}`}
            onClick={() => { toggleModalImage(true); }}
          />
          {/* usee the 'close-modal' class name to add css properties to
          determine the size of the image in the modal window */}
          <input type="submit" className={RNRCSS['close-modal']} onClick={() => { toggleModalImage(false); }} value="X" />
        </div>
      </div>
    </div>
  );
}

export default ThumbnailImageModal;
