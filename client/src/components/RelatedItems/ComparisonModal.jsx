import React, { useState } from 'react';
import { FaToolbox } from 'react-icons/fa';
import data from './sampleData';
import itemStyles from './Items.module.css';
import { useSelector, useDispatch } from 'react-redux';

function ComparisonModal({ sampleChar }) {
  let { modalOpen, relatedProductFeatures } = useSelector((state) => state.related);
  const dispatch = useDispatch();
  const [modal] = useState(data.sampleModal);

  const renderComparison = function (char, index) {
    return (
      <tr key={index}>
        <td>{char.currYes && <FaToolbox />}</td>
        <td>{char.value}</td>
        <td>{char.relYes && <FaToolbox />}</td>
      </tr>
    );
  };

  console.log('relatedProductFeatures: ', relatedProductFeatures);

  return (
    <table>
      <caption>Comparing</caption>
      <thead>
        <tr>
          <th>Current Product</th>
          <th>Characteristic</th>
          <th>Related Product</th>
        </tr>
      </thead>
      <tbody>
        {modal.map((char, index) => renderComparison(char, index))}
      </tbody>
    </table>
  );
}

export default ComparisonModal;
