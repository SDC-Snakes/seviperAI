import React from 'react';
import { newOutfitList } from '../../features/related/relatedSlice';
import { useSelector, useDispatch } from 'react-redux';

function outfitListStorage() {
  const dispatch = useDispatch();

  function addToOutfit(outfitData) {
    if (localStorage.getItem(outfitData.product_id)) {
      return (
        <div>Item already in outfit</div>
      );
    }
    localStorage.setItem(outfitData.product_id, JSON.stringify(outfitData));
  }

  function removeFromOutfit(productId) {
    localStorage.removeItem(productId);
  }

  const outfit = { ...localStorage };
  dispatch(newOutfitList(outfit));
}

export default outfitListStorage;
// { product id: {details: {}, photos: {}, ratings: {}}}
