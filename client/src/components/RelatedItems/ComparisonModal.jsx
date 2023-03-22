import React from 'react';
import itemStyles from './Items.module.css';
import { useSelector } from 'react-redux';

function ComparisonModal({ sampleChar }) {
  let { modalOpen, combinedProductFeatures } = useSelector((state) => state.related);

  function renderComparison(char, index) {
    return (
      <tr key={index}>
        <td>{char.current && <i className="fa-solid fa-circle-check" />}</td>
        <td>{char.value}</td>
        <td>{char.related && <i className="fa-solid fa-circle-check" />}</td>
      </tr>
    );
  }

  return (
    { modalOpen } ? (
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
          {combinedProductFeatures.map((char, index) => renderComparison(char, index))}
        </tbody>
      </table>
    )
      : null
  );
}

export default ComparisonModal;
