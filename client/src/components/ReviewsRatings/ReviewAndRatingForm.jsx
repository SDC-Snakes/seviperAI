// this is the Review And Rating form, used to submit new reviews and ratings for a product

//<star rating component>
//<addImage component>

import React, { useState } from 'react';
import './Modal.css';

function ReviewAndRatingForm() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }
  return (
  <>
    <button
      onClick={toggleModal}
      className="btn-modal">
        Open
    </button>

  </>
  )

}

export default  ReviewAndRatingForm;
