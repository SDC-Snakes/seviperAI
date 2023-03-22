import React from 'react';
import itemStyles from './Items.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { newModalState } from '../../features/related/relatedSlice';

function ComparisonModal() {
  let { modalOpen, combinedProductFeatures } = useSelector((state) => state.related);
  const dispatch = useDispatch();

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
    <div className={itemStyles.modal} onClick={closeModal}>
      <div className={itemStyles.overlay}>
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
        <input type="button" className={itemStyles['close-modal']} value="CLOSE MODAL" onClick={closeModal} />
      </div>
    </div>
  ) : null;
}

export default ComparisonModal;
