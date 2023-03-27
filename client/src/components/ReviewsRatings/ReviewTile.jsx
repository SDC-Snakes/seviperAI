/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaRegCheckCircle } from 'react-icons/fa';
import QuarterIncStarRating from './QuarterIncStarRating';
import ThumbnailImageModal from './ThumbnailImageModal';
import RNRCSS from './Modal.module.css';
import { useHelpfulReviewMutation, useReportReviewMutation } from '../../features/api/apiSlice';

function ReviewTile({ reviewsObj }) {
  const [modalImage, setModalImage] = useState(false);
  const [photoState, setPhotoState] = useState('');
  const [showFull, setShowFull] = useState(false);
  const toggleModalImage = (inputBool) => (
    setModalImage(inputBool)
  );
  const togglePhotoState = (photo) => (
    setPhotoState(photo)
  );
  const [trigger, { data, isSuccess }] = useHelpfulReviewMutation();
  const [triggerReport, { dataReport, isSuccessReport }] = useReportReviewMutation();

  const helpfulClickHandler = () => {
    trigger((reviewsObj.review_id));
    // will be used later to store session id's to prevent submitting a
    // put request more than once
    // setHelpful('yes');
  };
  const reportClickHandler = () => {
    triggerReport((reviewsObj.review_id));
  };
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
      <div style={{ maxWidth: '90%' }}>

        {reviewsObj.body.slice(0, 250)}
        {showFull && reviewsObj.body.slice(250)}
        {reviewsObj.body.length > 250 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            href="#"
            className="read-more-link"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setShowFull(!showFull);
            }}
          >
            {showFull ? ' ...Show less' : ' ...Show more'}
          </a>
        )}
      </div>
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
      {modalImage
      && (
      <ThumbnailImageModal
        RNRCSS={RNRCSS}
        toggleModalImage={toggleModalImage}
        photo={photoState}
      />
      )}
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
        <span onClick={helpfulClickHandler}>
          Yes
          {reviewsObj.helpfulness}
        </span>
        |
        <span>No</span>
        <div onClick={reportClickHandler}>
          Report
        </div>
      </div>
    </div>
  );
}

export default ReviewTile;
