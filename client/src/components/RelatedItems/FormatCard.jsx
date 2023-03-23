import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import itemStyles from './Items.module.css';
import {
  newModalState,
  newRelatedProductName,
  newRelatedProductFeatures,
  generateProductFeatures,
  newCurrentProductName,
} from '../../features/related/relatedSlice';

function FormatCard({ name, image, price, category, stars, outfit, modal, item }) {
  const dispatch = useDispatch();
  let { details } = useSelector((state) => state.products);

  function handleModalClick(e, item) {
    e.preventDefault();
    dispatch(newModalState());
    dispatch(newRelatedProductFeatures(item.details.features));
    dispatch(newRelatedProductName(item.details.name));
    dispatch(newCurrentProductName(details.name));
    dispatch(generateProductFeatures(details.features));
  }

  return (
    <div className={itemStyles['items-card']}>
      <i className={
      `fa-solid fa-circle-info ${itemStyles['items-icon']} ${itemStyles['items-info']}`}
      onClick={(e) => {handleModalClick(e, item)}}/>
      {outfit && <i className={
        `fa-solid fa-circle-xmark ${itemStyles['items-icon']} ${itemStyles['items-xmark']}`}
      />}
      <img className={itemStyles['items-card-img']} src={image} alt="" />
      <div>{stars}</div>
      <p className={itemStyles['product-category']}>{category}</p>
      <h6 className={itemStyles['product-name']}>{name}</h6>
      <p className={itemStyles['card-price']}>{price}</p>
    </div>
  );
};

export default FormatCard;
