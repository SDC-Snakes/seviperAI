import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { newOutfitList, newAddToOutfit } from '../../features/related/relatedSlice';
import { useGetProductInfoQuery } from '../../features/api/apiSlice';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import FormatCard from './FormatCard';
import itemStyles from './Items.module.css';

function OutfitList({ relatedIndex }) {
  const dispatch = useDispatch();
  const params = useParams();
  let { outfitList } = useSelector((state) => state.related);

  const {
    data: productInfo,
    isFetching,
  } = useGetProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  function handleAddToOutfit(productInfo) {
    if (!JSON.parse(localStorage.getItem(productInfo.details.id))) {
      dispatch(newAddToOutfit(productInfo));
    }
    dispatch(newOutfitList(Object.values({ ...localStorage }).map((item) => JSON.parse(item))));
    return (
      <div>Item already in outfit</div>
    );
  }

  function findImage(item) {
    for (let i = 0; i < item.styles.results.length; i++) {
      const style = item.styles.results[i];
      for (let j = 0; j < style.photos.length; j++) {
        const stylePhoto = style.photos[j];
        if (stylePhoto.thumbnail_url) {
          return stylePhoto.thumbnail_url;
        }
      }
    }
  }

  function renderList(item, index) {
    return (
      <div key={index}>
        {relatedIndex <= index && (
          <FormatCard
            stars={<QuarterStarsAverageRating productRating={item.ratings.ratings} />}
            name={item.details.name}
            category={item.details.category}
            image={findImage(item)}
            price={item.details.default_price}
            itemStyles={itemStyles}
          />
        )}
      </div>
    );
  }

  return (
    <div className={itemStyles['items-list-wrapper']}>
      <span className={itemStyles['items-list-title']}>Outfit List</span>
      <div className={itemStyles['items-list-content']}>
        <div className={itemStyles['items-card']} onClick={() => handleAddToOutfit(productInfo)}>
          <span>Add to outfit</span>
        </div>
        {outfitList.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
}

export default OutfitList;
