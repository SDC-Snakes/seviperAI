import React, { useState } from 'react';
import ProductDetails from '../ProductDetails/ProductDetails';

const ComparisonModal = ({ sampleChar }) => {

  const [modal, setModal] = useState([]);

  console.log('productData from comparisonModal: ', ProductDetails.productInfo.styles.results);

  const renderComparison = (char, index) => {
    return (
      <div key={index}>
        <p>{sampleChar}</p>
      </div>
    )
  }

  return(
    <table>
      <tr>
        <th>Comparing</th>
        <th>Current Product</th>
        <tr>{modal.map((char, index) => renderComparison(char, index))}</tr>
        <th>Related Product</th>
      </tr>
    </table>
  );
};

export default ComparisonModal;
