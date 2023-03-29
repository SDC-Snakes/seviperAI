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
      <div key={index} className={itemStyles['modal-row']}>
        <span className={itemStyles['modal-left-check']}>{char.current && <i className="fa-solid fa-circle-check" />}</span>
        <span className={itemStyles['modal-entry']}>{char.value}</span>
        <span className={itemStyles['modal-right-check']}>{char.related && <i className="fa-solid fa-circle-check" />}</span>
      </div>
    );
  }

  function closeModal(e) {
    e.preventDefault();
    dispatch(newModalState());
  }

  return modalOpen && (
    <div className={itemStyles.modal}>
      <div className={itemStyles.overlay} onClick={closeModal} />
        <div className={`${itemStyles['modal-content']} ${itemStyles['modal-frame']}`} onClick={(e) => e.stopPropagation()}>
          <div className={itemStyles['modal-title']}>Comparing</div>
          <div>
            <span className={itemStyles['modal-headers']}>
              <span className={`${itemStyles['modal-current-product']} ${itemStyles['modal-product']}`}>{currentProductName}</span>
              <span className={`${itemStyles['modal-related-product']} ${itemStyles['modal-product']}`}>{relatedProductName}</span>
            </span>
          </div>
          <div className={itemStyles['modal-entry-container']}>
            {combinedProductFeatures.map((char, index) => renderComparison(char, index))}
          </div>
        </div>
      <div className={`${itemStyles['modal-frame']} ${itemStyles['modal-bottom']}`} />
    </div>
  );
}

export default ComparisonModal;
