import React from 'react';
import itemStyles from './Items.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { newModalState } from '../../features/related/relatedSlice';

function ComparisonModal() {
  const {
    modalOpen,
    combinedProductFeatures,
    currentProductName,
    relatedProductName,
  } = useSelector((state) => state.related);
  const dispatch = useDispatch();

  function renderComparison(char, index) {
    return (
      <tr key={index} className={itemStyles['modal-row']}>
        <td className={itemStyles['modal-left-check']}>{char.current && <i className="fa-solid fa-circle-check" />}</td>
        <td className={itemStyles.entry}>{char.value}</td>
        <td className={itemStyles['modal-right-check']}>{char.related && <i className="fa-solid fa-circle-check" />}</td>
      </tr>
    );
  }

  function closeModal(e) {
    e.preventDefault();
    dispatch(newModalState());
  }

  return modalOpen && (
    <div className={itemStyles.modal}>
      <div className={itemStyles.overlay} onClick={closeModal} />
        <table className={itemStyles['modal-content']} onClick={(e) => e.stopPropagation()}>
          <caption className={itemStyles['modal-title']}>Comparing</caption>
          <thead>
            <tr className={itemStyles['modal-headers']}>
              <th className={itemStyles['modal-current-product']}>{currentProductName}</th>
              <th className={itemStyles['modal-related-product']}>{relatedProductName}</th>
            </tr>
          </thead>
          <tbody className={itemStyles['modal-entry-container']}>
            {combinedProductFeatures.map((char, index) => renderComparison(char, index))}
          </tbody>
        </table>
    </div>
  );
}

export default ComparisonModal;
