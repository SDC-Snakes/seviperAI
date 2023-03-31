/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import RNRCSS from './Modal.module.css';
import ImageDropzone from './ImageDropzone';

function AddImageReviews({ uploadImageHandler }) {
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [inputField, setInputField] = useState('');
  const handleUploadedImages = () => {
    if (inputField.length > 1) {
      setImages((prevState) => [...prevState, inputField]);
      setInputField('');
    }
  };
  const handleDropedInImages = (image) => {
    setImages((prevState) => [...prevState, image]);
  };
  const handleInputFieldChange = (e) => {
    setInputField(e.target.value);
  };
  const toggleModal = (inputBool) => {
    setModal(inputBool);
  };
  return (
    <>
      <input
        className="button button-light"
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          toggleModal(true);
        }}
        value="Add images"
      />
      {modal
      && (
        <div className={RNRCSS.modalimage}>
          <div className={RNRCSS.overlayimage}>
            <div className={RNRCSS['modal-content-image']}>
              <h2 style={{ marginTop: '10%' }}> Add images to your review!</h2>
              <input
                placeholder="  insert image link here"
                value={inputField}
                onChange={handleInputFieldChange}
                style={{ width: '100%', marginBottom: '1%', borderRadius: '10px' }}
              />
              {images.length < 5
                && (
                <input
                  type="submit"
                  className="button button-light"
                  onClick={(event) => {
                    event.preventDefault();
                    handleUploadedImages();
                  }}
                  value="upload image"
                  style={{ marginBottom: '10%', marginLeft: '30%' }}
                />
                )}
              <ImageDropzone handleDropedInImages={handleDropedInImages} />
              {images.length > 0
              && (
                <div>
                  {images.map((image) => (
                    <img
                      className={RNRCSS['thumbnail-uploaded-review-image']}
                      src={image}
                      alt={`${image}`}
                      key={nanoid()}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              )}
              <input
                type="submit"
                className={RNRCSS['close-modal-image']}
                onClick={() => { toggleModal(false); }}
                value="X"
              />
              <input
                style={{ marginTop: '10%', marginLeft: '30%'}}
                type="submit"
                className="button button-dark"
                onClick={(e) => {
                  e.preventDefault();
                  uploadImageHandler(images);
                  toggleModal(false);
                }}
                value="submit all images"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddImageReviews;
