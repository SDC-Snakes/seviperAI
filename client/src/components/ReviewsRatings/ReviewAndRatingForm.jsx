/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// this is the Review And Rating form, used to submit new reviews and ratings for a product
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePostNewReviewMutation } from '../../features/api/apiSlice';
import StarRating from './StarRating';
import AddImageReviews from './AddImageReviews';

function ReviewAndRatingForm({ RNRCSS }) {
  const params = useParams();
  const { meta } = useSelector((state) => state.reviews);
  const { details } = useSelector((state) => state.products);
  const charId = meta.characteristics;
  const [modal, setModal] = useState(false);
  const charsPropsObj = {};
  for (const key in charId) {
    charsPropsObj[charId[key]['id']] = 1;
  }
  const [characteristics, setCharacteristics] = useState(charsPropsObj);
  const [reviewPropsObj, setReviewPropsObj] = useState({
    product_id: parseInt(params.productId, 10),
    rating: 1,
    summary: '',
    body: '',
    recommend: true,
    name: '',
    email: '',
    photos: ['testlink'],
    characteristics,
  });
  const [triggerReview, { data, isSuccess }] = usePostNewReviewMutation();
  const handleCharChange = (rating, charName) => {
    const propertyChar = charId[charName]['id'];
    setCharacteristics((prevState) => ({
      ...prevState,
      [propertyChar]: rating,
    }));
    setReviewPropsObj((prevState) => ({
      ...prevState,
      characteristics: {
        ...prevState.characteristics,
        [propertyChar]: rating,
      },
    }));
  };
  const toggleModal = (inputBool) => {
    setModal(inputBool);
  };
  const handleStarRatingChange = (starRating) => {
    setReviewPropsObj({ ...reviewPropsObj, rating: starRating });
  };
  const handleOptionChange = (bool) => {
    setReviewPropsObj({ ...reviewPropsObj, recommend: bool });
  };
  const handleInputChange = (event, propertyName) => {
    setReviewPropsObj({ ...reviewPropsObj, [propertyName]: event.target.value });
  };
  const uploadImageHandler = (imagesArr) => {
    setReviewPropsObj((prevState) => ({
      ...prevState,
      photos: [...prevState.photos, ...imagesArr],
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    triggerReview(reviewPropsObj);
    toggleModal(false);
  };

  return (
    <>
      <input type="submit" onClick={() => { toggleModal(true); }} className={RNRCSS['btn-modal']} value="Add a review" />

      {modal && (
        <div className={RNRCSS['modal']}>
          <div className={RNRCSS['overlay']}>
            <div className={RNRCSS['modal-content']}>
              <form onSubmit={onSubmit}>
                <h2> Write Your Review</h2>
                <h4>
                  About the {details.name}
                </h4>
                <h6>Overall rating </h6>
                <div><StarRating handleStarRatingChange={handleStarRatingChange} /></div>
                <div>
                  <h6>Do you recommend this product? </h6>
                  <label>
                    <input
                      type="radio"
                      checked={reviewPropsObj.recommend === true}
                      onChange={() => (handleOptionChange(true))}
                    />
                    Yes
                  </label>

                  <label>
                    <input
                      type="radio"
                      checked={reviewPropsObj.recommend === false}
                      onChange={() => (handleOptionChange(false))}
                    />
                    No
                  </label>
                </div>
                <div className="characteristicsRadioButtons">
                  <h6>Characteristics </h6>
                  {meta.characteristics.Size
                  && (
                  <div className="Size-Radio-Button">
                    Size
                    {['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'].map((element, index) => (
                      <label key={index.toString()}>
                        <input
                          type="radio"
                          value={element}
                          checked={characteristics[charId.Size.id] === index + 1}
                          onChange={() => { handleCharChange(index + 1, 'Size'); }}
                        />
                        {element}
                      </label>
                    ))}
                  </div>
                  )}

                  {meta.characteristics.Width
                  && (
                  <div className="Width-Radio-Button">
                    Width
                    {['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'].map((element, index) => (
                      <label key={index.toString()}>
                        <input
                          type="radio"
                          value={element}
                          checked={characteristics[charId.Width.id] === index + 1}
                          onChange={() => { handleCharChange(index + 1, 'Width'); }}
                        />
                        {element}
                      </label>
                    ))}
                  </div>
                  )}

                  {meta.characteristics.Comfort
                  && (
                  <div className="Comfort-Radio-Button">
                    Comfortable
                    {['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'].map((element, index) => (
                      <label key={index.toString()}>
                        <input
                          type="radio"
                          value={element}
                          checked={characteristics[charId.Comfort.id] === index + 1}
                          onChange={() => { handleCharChange(index + 1, 'Comfort'); }}
                        />
                        {element}
                      </label>
                    ))}
                  </div>
                  )}

                  {meta.characteristics.Quality
                  && (
                  <div className="Quality-Radio-Button">
                    Quality
                    {['Poor', 'Below average', 'What I expected', 'Pretty Great', 'Perfect'].map((element, index) => (
                      <label key={index.toString()}>
                        <input
                          type="radio"
                          value={element}
                          checked={characteristics[charId.Quality.id] === index + 1}
                          onChange={() => { handleCharChange(index + 1, 'Quality'); }}
                        />
                        {element}
                      </label>
                    ))}
                  </div>
                  )}

                  {meta.characteristics.Length
                  && (
                  <div className="Length-Radio-Button">
                    Length
                    {['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'].map((element, index) => (
                      <label key={index.toString()}>
                        <input
                          type="radio"
                          value={element}
                          checked={characteristics[charId.Length.id] === index + 1}
                          onChange={() => { handleCharChange(index + 1, 'Length'); }}
                        />
                        {element}
                      </label>
                    ))}
                  </div>
                  )}

                  {meta.characteristics.Fit
                  && (
                  <div className="Fit-Radio-Button">
                    Fit
                    {['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'].map((element, index) => (
                      <label key={index.toString()}>
                        <input
                          type="radio"
                          value={element}
                          checked={characteristics[charId.Fit.id] === index + 1}
                          onChange={() => { handleCharChange(index + 1, 'Fit'); }}
                        />
                        {element}
                      </label>
                    ))}
                  </div>
                  )}

                </div>
                <div>
                  <h6>Review summary</h6>
                  <input
                    placeholder="Example: Best purchase ever!"
                    value={reviewPropsObj.summary}
                    onChange={(e) => { handleInputChange(e, 'summary'); }}
                    maxLength="60"
                  />
                </div>
                <div>
                  <h6>Review body</h6>
                  <input
                    placeholder="Why did you like the product or not?"
                    value={reviewPropsObj.body}
                    onChange={(e) => { handleInputChange(e, 'body'); }}
                    minLength="50"
                    maxLength="1000"
                    required
                  />
                </div>
                <div>
                  {reviewPropsObj.body.length < 50 ? `Minimum required characters left: ${50 - reviewPropsObj.body.length}` : 'Minimum reached'}
                </div>
                <div>
                  <h6> Upload your photos</h6>
                  <AddImageReviews uploadImageHandler={uploadImageHandler} />
                </div>
                <div>
                  <h6>What is your nickname</h6>
                  <input
                    value={reviewPropsObj.name}
                    onChange={(e) => { handleInputChange(e, 'name'); }}
                    placeholder="Example: jackson11!"
                    maxLength="60"
                    required
                  />
                </div>
                <div>
                  For privacy reasons, do not use your full name or email address
                </div>
                <div>
                  <h6>Your email</h6>
                  <input
                    type="email"
                    value={reviewPropsObj.email}
                    onChange={(e) => { handleInputChange(e, 'email'); }}
                    placeholder="Example: jackson11@email.com"
                    maxLength="60"
                    required
                  />
                </div>
                <div>
                  For authentication reasons, you will not be emailed
                </div>
                <input
                  type="submit"
                  className={RNRCSS['close-modal']}
                  onClick={() => {
                    toggleModal(false);
                  }}
                  value="X"
                />
                <div>
                  <input type="submit" value="Submit Review" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewAndRatingForm;
