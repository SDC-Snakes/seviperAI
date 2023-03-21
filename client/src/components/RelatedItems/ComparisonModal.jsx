import React, { useState } from 'react';
import { FaToolbox } from 'react-icons/fa';
import data from './sampleData';
import { useSelector, useDispatch } from 'react-redux';

const ComparisonModal = function ({ itemStyles, sampleChar }) {
  let { modalOpen } = useSelector((state) => state.related);
  const dispatch = useDispatch();
  const [modal] = useState(data.sampleModal);

  console.log('modalOpen ComparisonModal: ', modalOpen);
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
        <th>Comparing</th>
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
};

export default ComparisonModal;
