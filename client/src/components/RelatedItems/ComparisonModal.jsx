import React, { useState } from 'react';
import { FaToolbox } from 'react-icons/fa';
import data from './sampleData';
// import ProductDetails from '../ProductDetails/ProductDetails';

const ComparisonModal = function ({ sampleChar }) {
  const [modal, setModal] = useState(data.sampleModal);

  const renderComparison = function (char, index) {
    return (
      <div key={index}>
        {char.currYes && <FaToolbox />}
        <p>{char.value}</p>
        {char.relYes && <FaToolbox />}
      </div>
    );
  };

  return (
    <table>
      <tr>
        <th>Comparing</th>
        <th>Current Product</th>
        <th>Related Product</th>
      </tr>
      <tr>
        {modal.map((char, index) => renderComparison(char, index))}
      </tr>
    </table>
  );
};

export default ComparisonModal;
