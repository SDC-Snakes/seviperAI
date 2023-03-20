import React, { useState } from 'react';
import { FaToolbox } from 'react-icons/fa';
import data from './sampleData';
// import ProductDetails from '../ProductDetails/ProductDetails';

const ComparisonModal = function ({ sampleChar }) {
  const [modal, setModal] = useState(data.sampleModal);

  const renderComparison = function (char, index) {
    return (
      <tr key={index}>
        <td>{char.currYes && <FaToolbox />}</td>
        <td>{char.value}</td>
        <td>{char.relYes && <FaToolbox />}</td>
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Comparing</th>
          <th>Current Product</th>
          <th>Related Product</th>
        </tr>
      </thead>
      <tbody>
        {modal.map((char, index) => renderComparison(char, index))}
      </tbody>
    </table>
  );
};

export default ComparisonModal;
