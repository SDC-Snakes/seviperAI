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

  function comparisonData() {
    const combinedData = {};
    const relatedProductDetails = relatedProductFeatures;
    const currentProductDetails = details.features;
    relatedProductDetails.forEach((char) => {
      const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
      combinedData[description] = { related: true, current: false };
    });
    currentProductDetails.forEach((char) => {
      const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
      if (combinedData[description]) {
        combinedData[description].current = true;
      } else {
        combinedData[description] = { related: false, current: true };
      }
    });
    dispatch(newCombinedProductFeatures(combinedData));
    const mappedData = Object.keys(combinedProductFeatures).map(
      (key) => ({
        value: key,
        related: combinedProductFeatures[key].related,
        current: combinedProductFeatures[key].current,
      }),
    );
    dispatch(newCombinedProductFeatures(mappedData));
    // console.log('combinedProductFeaturesOutside: ', mappedData);
  }

  function renderComparison(char, index) {
    return (
      <tr key={index}>
        <td>{char.currYes && <FaToolbox />}</td>
        <td>{char.value}</td>
        <td>{char.relYes && <FaToolbox />}</td>
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
          {modal.map((char, index) => renderComparison(char, index))}
        </tbody>
      </table>
    )
      : null
  );
}

export default ComparisonModal;
