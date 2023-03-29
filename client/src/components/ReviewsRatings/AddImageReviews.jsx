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
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          toggleModal(true);
        }}
        value="Add images"
      />
      {modal
      && (
        <div className={RNRCSS.modal}>
          <div className={RNRCSS.overlay}>
            <div className={RNRCSS['modal-content']}>
              <h2> Add images to your review!</h2>
              <input
                placeholder="insert image link here"
                value={inputField}
                onChange={handleInputFieldChange}
              />
              <ImageDropzone handleDropedInImages={handleDropedInImages} />
              {images.length < 5
                && (
                <input
                  type="submit"
                  className={RNRCSS['add-image-input']}
                  onClick={(event) => {
                    event.preventDefault();
                    handleUploadedImages();
                  }}
                  value="upload image"
                />
                )}
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
                className={RNRCSS['close-modal']}
                onClick={() => { toggleModal(false); }}
                value="X"
              />
              <input
                type="submit"
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
