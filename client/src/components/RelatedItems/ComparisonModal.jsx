import React, { useState } from 'react';
import { FaToolbox } from 'react-icons/fa';
import data from './sampleData';
import itemStyles from './Items.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { newCombinedProductFeatures } from '../../features/related/relatedSlice';

function ComparisonModal({ sampleChar }) {
  let { modalOpen, relatedProductFeatures, combinedProductFeatures } = useSelector((state) => state.related);
  let { details } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [modal] = useState(data.sampleModal);

  let mappedData = [];

  function comparisonData() {
    const combinedData = [];
    const relatedProductDetails = relatedProductFeatures;
    const currentProductDetails = details.features;
    relatedProductDetails.forEach((char) => {
      const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
      combinedData.push({ value: description, related: true, current: false });
    });
    currentProductDetails.forEach((char) => {
      const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
      let flag = false;
      combinedData.forEach((el) => {
        if (el.value === description) {
          el.current = true;
          flag = true;
        }
      });
      if (!flag) { combinedData.push({ value: description, related: false, current: true }); }
    });
    console.log('combinedData: ', combinedData);
    // dispatch(newCombinedProductFeatures(combinedData));
  }

  function renderComparison(char, index) {
    return (
      <tr key={index}>
        <td>{char.current && <FaToolbox />}</td>
        <td>{char.value}</td>
        <td>{char.related && <FaToolbox />}</td>
      </tr>
    );
  }

  return (
    { modalOpen } ? (
      <table>
        <caption onClick={comparisonData}>Comparing</caption>
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
