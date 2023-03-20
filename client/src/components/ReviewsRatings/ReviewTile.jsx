// this is the Review Tile component
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import QuarterIncStarRating from './QuarterIncStarRating';
import Report from './Report';
import ThumbnailImageModal from './ThumbnailImageModal';
import RNRCSS from './Modal.module.css';
import { FaRegCheckCircle } from 'react-icons/fa';

function ReviewTile({ index }) {
  const [helpful, setHelpful] = useState('');
  // send a post request with the helpful state to the API
  const { reviews } = useSelector((state) => state.reviews);
  console.log("reviews data", reviews)
  const [modalImage, setModalImage] = useState(false); // or false?
  const toggleModalImage = (inputBool) => (
    setModalImage(inputBool)
  );
  return (
    <div>
      {reviews.results[index].rating}
      <QuarterIncStarRating averageRating={reviews.results[index].rating} />
      <small>
        { format(new Date(reviews.results[index].date), 'MMMM dd yyyy') }
      </small>
      <h5>
        Review Title Summary:
        {reviews.results[index].summary}
      </h5>
      <p>{reviews.results[index].body}</p>
      {reviews.results[index].photos.map((photo) => (
        <span key={photo.id}>
          <img
            key={photo.id}
            src={photo.url}
            alt={`${photo.id}`}
            onClick={() => { toggleModalImage(true); }}
          />
          {modalImage && (<ThumbnailImageModal RNRCSS={RNRCSS} toggleModalImage={toggleModalImage} photo={photo}/>)}
        </span>
      ))}
      {/* if user recommends the product return text and a checkmark */}
      { reviews.results[index].recommend
      && (<div> <FaRegCheckCircle /> I recommend this product </div>
      )}

      <h6>
        Reviewer Name:{reviews.results[index].reviewer_name}
      </h6>

      {reviews.results[index].response && (
        <div className={RNRCSS["response-from-seller"]}>
          <h6> Response from seller:</h6>
          <p>reviews.results[index].response</p>
        </div>
      )}

      <div>
        Helpful?
        <span onClick={() => { setHelpful('yes'); }}> Yes {reviews.results[index].helpfulness}</span>
        |
        <span onClick={() => { setHelpful('No'); }}>No</span>
        |
        <Report />
      </div>
    </div>
  );
}

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewTile;
