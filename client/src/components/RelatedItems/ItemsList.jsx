import React, { useState } from 'react';
import FormatCard from './FormatCard';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import ComparisonModal from './ComparisonModal';
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { newModalState, newCurrentRelatedProduct } from '../../features/related/relatedSlice';

const ItemsList = function ({ relatedIndex, itemStyles }) {
  let { modalOpen, currentRelatedProduct } = useSelector((state) => state.related);
  const dispatch = useDispatch();
  const params = useParams();
  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  const findImage = function(item) {
    for (let i = 0; i < item.photos.results.length; i++) {
      const style = item.photos.results[i];
      for (let j = 0; j < style.photos.length; j++) {
        const stylePhoto = style.photos[j];
        if (stylePhoto.thumbnail_url) {
          return stylePhoto.thumbnail_url;
        }
      }
    }
  };

  // ATTEMPTED REFACTOR, DOES NOT WORK
  // const findImage = function (item) {
  //   for (let i = 0; i < item.photos.results.length; i++) {
  //     const style = item.photos.results[i];
  //     return style.photos.find(photo => photo.thumbnail_url);
  //   };
  // };

  const handleModalClick = function(e, item) {
    e.preventDefault();
    dispatch(newModalState());
    dispatch(newCurrentRelatedProduct(item.details.features));
  };

  const renderList = function (item, index) {
    return (
      <div onClick={(e) => handleModalClick(e, item)} >
        {relatedIndex <= index && (
          <FormatCard
            key={index}
            stars={<QuarterStarsAverageRating rating={item.ratings.ratings} />}
            name={item.details.name}
            category={item.details.category}
            image={findImage(item)}
            price={item.details.default_price}
            itemStyles={itemStyles}

          />
        )}
      </div>
    );
  };

  if (isFetching) {
    return <div>loading...</div>;
  }

  return (
    <div className={itemStyles['items-list-wrapper']}>
      <span className={itemStyles['items-list-title']}>Other items that might interest you</span>
      <div className={itemStyles['items-list-content']}>
        {relatedProducts.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
};

export default ItemsList;
