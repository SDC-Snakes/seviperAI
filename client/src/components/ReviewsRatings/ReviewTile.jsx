/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// this is the Review Tile component
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { FaRegCheckCircle } from 'react-icons/fa';
import QuarterIncStarRating from './QuarterIncStarRating';
import Report from './Report';
import ThumbnailImageModal from './ThumbnailImageModal';
import RNRCSS from './Modal.module.css';

function ReviewTile({ reviewsObj }) {
  const barRating = useSelector(state => state.reviews.ratingBarSelect);
  const [helpful, setHelpful] = useState('No');
  // send a post request with the helpful state to the API when helpful is 'yes'

  const [modalImage, setModalImage] = useState(false);
  const [photoState, setPhotoState] = useState('');
  const toggleModalImage = (inputBool) => (
    setModalImage(inputBool)
  );
  const togglePhotoState = (photo) => (
    setPhotoState(photo)
  );

  return (
    <div className={RNRCSS['review-tile-in-reviews']}>
      {reviewsObj.rating}
      <QuarterIncStarRating averageRating={reviewsObj.rating} />
      <small>
        { format(new Date(reviewsObj.date), 'MMMM dd yyyy') }
      </small>
      <h5>
        {/* Review Title Summary: */}
        {reviewsObj.summary}
      </h5>
      <p>{reviewsObj.body}</p>
      {reviewsObj.photos.map((photo) => (
        <span key={photo.id}>
          <img
            className={RNRCSS['thumbnail-review-image']}
            key={photo.id}
            src={photo.url}
            alt={`${photo.id}`}
            onClick={() => {
              toggleModalImage(!modalImage);
              togglePhotoState(photo);
            }}
          />
        </span>
      ))}
      {modalImage && (<ThumbnailImageModal RNRCSS={RNRCSS} toggleModalImage={toggleModalImage} photo={photoState} />)}
      {/* if user recommends the product return text and a checkmark */}
      { reviewsObj.recommend
      && (
      <div>
        <FaRegCheckCircle />
        I recommend this product
      </div>
      )}

      <h6>
        { /* Reviewer Name: */ }
        {reviewsObj.reviewer_name}
      </h6>

      {reviewsObj.response && (
      <div className={RNRCSS['response-from-seller']}>
        <h6> Response from seller:</h6>
        <p>{reviewsObj.response}</p>
      </div>
      )}

      <div>
        Helpful?
        <span onClick={() => { setHelpful('yes'); }}>
          Yes
          {reviewsObj.helpfulness}
        </span>
        |
        <span>No</span>
        <Report />
      </div>
    </div>
  );
}

export default ReviewTile;
