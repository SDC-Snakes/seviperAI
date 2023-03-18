import React, { useState } from 'react';

const ComparisonModal = ({ sampleChar }) => {

  const [modal, setModal] = useState([]);

  const renderComparison = (char, index) => {
    return (
      <div key={index}>
        <p>{sampleChar}</p>
      </div>
    )
  }

  return(
    <div>
      <h2>Comparing</h2>
      <h6>Current Product</h6>
      <div>{modal.map((char, index) => renderComparison(char, index))}</div>
      <h6>Related Product</h6>
    </div>
  );
};

export default ComparisonModal;
