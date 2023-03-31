import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import itemStyles from './Items.module.css';
import {
  newModalState,
  newRelatedProductName,
  newRelatedProductFeatures,
  generateProductFeatures,
  newCurrentProductName,
  newRemoveFromOutfit,
  newOutfitList,
} from '../../features/related/relatedSlice';

function FormatCard({ name, image, price, category, stars, outfit, item, salePrice }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { details } = useSelector((state) => state.products);

  // itemData is passed as a prop 'item' from the corresponding list
  function removeFromOutfit(itemData) {
    dispatch(newRemoveFromOutfit(itemData));
    dispatch(newOutfitList());
  }

  // Generates data for modal based on card selected
  function handleModalClick(e, itemData) {
    e.preventDefault();
    dispatch(newModalState());
    dispatch(newRelatedProductFeatures(itemData.details.features));
    dispatch(newRelatedProductName(itemData.details.name));
    dispatch(newCurrentProductName(details.name));
    dispatch(generateProductFeatures(details.features));
  }

  // Refreshes page to selected related item
  function navigateToRelatedItem(e, productId) {
    e.preventDefault();
    navigate(`/${productId}`);
  }

  return (
    <div className={itemStyles['items-card']} data-testid="card" onDoubleClick={(e) => navigateToRelatedItem(e, item.details.id)}>
      <i className={
        `fa-solid fa-circle-info ${itemStyles['items-icon']} ${itemStyles['items-modal']}`}
        onClick={(e) => {handleModalClick(e, item)}} aria-label={'modal-icon'}
      />
      {outfit && <i className={
        `fa-solid fa-circle-xmark ${itemStyles['items-icon']} ${itemStyles['items-xmark']}`}
        onClick={() => removeFromOutfit(item)} aria-label={'remove-icon'}
      />}
      <img className={itemStyles['items-card-img']} src={image} alt="" />
      <div>{stars}</div>
      <p className={itemStyles['product-category']}>{category}</p>
      <h6 className={itemStyles['product-name']}>{name}</h6>
      {salePrice ? (
        <div className={itemStyles['card-price']}>
          <p className={itemStyles['card-price-sale']}>{`$${salePrice}`}</p>
          <p><s>{`$${price}`}</s></p>
        </div>
      ) : <p>{`$${price}`}</p>}
    </div>
  );
}

export default FormatCard;
