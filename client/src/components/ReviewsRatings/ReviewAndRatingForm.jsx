// this is the Review And Rating form, used to submit new reviews and ratings for a product

//<star rating component>
//<addImage component>

import React, { useState } from 'react';
import StarRating from './StarRating';
// import './Modal.module.css';

function ReviewAndRatingForm({RNRCSS}) {
  const [modal, setModal] = useState(false);
  const [recommendOption, setrecommendOption] = useState("");

  const toggleModal = (inputBool) => {
    setModal(inputBool);
  };
  const handleOptionChange = (event) => {
    setrecommendOption(event.target.value);
  };
  return (
    <>
      <input type="submit" onClick={() => { toggleModal(true); }} className={RNRCSS["btn-modal"]} value="Add a review" />

      {modal && (
        <div className={RNRCSS["modal"]}>
          <div className={RNRCSS["overlay"]}>
            <div className={RNRCSS["modal-content"]}>
              <h2> Submit a Review</h2>
              <p>
                please fill out the fields below to submit a product review
              </p>
              <input value="" placeholder="title" />
              <div><StarRating /></div>
              <div>
                Do you recommend this product?
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={recommendOption === 'yes'}
                    onChange={handleOptionChange}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={recommendOption === 'no'}
                    onChange={handleOptionChange}
                  />
                  No
                </label>

              </div>
              <div>
                <input value="" placeholder="Review Summary" />
              </div>
              <div>
                <input value="" placeholder="Review Body" />
              </div>
              <div>
                <input value="" placeholder="username" />
              </div>
              <div>
                <input value="" placeholder="email" />
              </div>
              <div>
                <input type="submit" value="Submit Review" />
              </div>

              <input type="submit" className={RNRCSS['close-modal']} onClick={() => { toggleModal(false); }} value="X" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewAndRatingForm;
