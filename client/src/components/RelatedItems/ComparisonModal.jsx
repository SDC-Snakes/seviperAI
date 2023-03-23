import React from 'react';
import itemStyles from './Items.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { newModalState } from '../../features/related/relatedSlice';

function ComparisonModal() {
  const { modalOpen, combinedProductFeatures } = useSelector((state) => state.related);
  const dispatch = useDispatch();

  function renderTitle(char, index) {

  }

  function renderComparison(char, index) {
    return (
      <tr key={index}>
        <td>{char.current && <i className="fa-solid fa-circle-check" />}</td>
        <td>{char.value}</td>
        <td>{char.related && <i className="fa-solid fa-circle-check" />}</td>
      </tr>
    );
  }

  function closeModal(e) {
    e.preventDefault();
    dispatch(newModalState());
  }

  // onClick={dispatch(newModalState())}

  return modalOpen ? (
    <div className={itemStyles.modal}>
      <div className={itemStyles.overlay} onClick={closeModal}>
      <table className={itemStyles['modal-content']} onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  ) : null;
}

export default ComparisonModal;
