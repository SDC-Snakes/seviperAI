// this is the Review Tile component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import QuarterIncStarRating from './QuarterIncStarRating';
import Report from './Report';
import ThumbnailImageModal from './ThumbnailImageModal';
import RNRCSS from './Modal.module.css';
import { FaRegCheckCircle } from 'react-icons/fa';

function ReviewTile({ index, updateRenderedElements }) {
  const barRating = useSelector(state => state.reviews.ratingBarSelect);
  // useEffect(() => {
  //   updateRenderedElements();
  // }, [updateRenderedElements]);
  const [helpful, setHelpful] = useState('No');
  // send a post request with the helpful state to the API when helpful is 'yes'
  const { reviews } = useSelector((state) => state.reviews);
  const [modalImage, setModalImage] = useState(false);
  const [photoState, setPhotoState] = useState('');
  const toggleModalImage = (inputBool) => (
    setModalImage(inputBool)
   );
  const togglePhotoState = (photo) => (
    setPhotoState(photo)
  );
    console.log("reviews data", barRating.includes(reviews.results[index].rating))

  return (
   <div>
        {reviews.results[index].rating}
        <QuarterIncStarRating averageRating={reviews.results[index].rating} />
        <small>
          { format(new Date(reviews.results[index].date), 'MMMM dd yyyy') }
        </small>
        <h5>
          {/* Review Title Summary: */}
          {reviews.results[index].summary}
        </h5>
        <p>{reviews.results[index].body}</p>
        {reviews.results[index].photos.map((photo) => (
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
        {modalImage && (<ThumbnailImageModal RNRCSS={RNRCSS} toggleModalImage={toggleModalImage} photo={photoState}/>)}
        {/* if user recommends the product return text and a checkmark */}
        { reviews.results[index].recommend
        && (
        <div>
          <FaRegCheckCircle /> I recommend this product
        </div>
        )}

        <h6>
          {/* Reviewer Name:*/}
          {reviews.results[index].reviewer_name}
        </h6>

        {reviews.results[index].response && (
          <div className={RNRCSS['response-from-seller']}>
            <h6> Response from seller:</h6>
            <p>{reviews.results[index].response}</p>
          </div>
        )}

        <div>
          Helpful?
          <span onClick={() => { setHelpful('yes'); }}> Yes {reviews.results[index].helpfulness}</span>
          |
          <span>No</span>
          <Report />
        </div>
      </div>
  );

}

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewTile;
