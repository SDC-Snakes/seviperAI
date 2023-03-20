import React, { useState } from 'react';
import FormatCard from './FormatCard';
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const ItemsList = function ({ itemStyles }) {
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
      // console.log('item.photos.results.photos: ', item.photos.results);
      for (let j = 0; j < style.photos.length; j++) {
        const stylePhoto = style.photos[j];
        if (stylePhoto.thumbnail_url) {
          return stylePhoto.thumbnail_url;
        }
      }
    }
  };
  // console.log('relatedProducts ItemsList: ', relatedProducts);

  const renderList = function (item, index) {
    return (
      <FormatCard
        key={index}
        name={item.details.name}
        category={item.details.category}
        image={findImage(item)}
        price={item.details.default_price}
        itemStyles={itemStyles}
      />
    );
  };

  if (isFetching) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <span className={itemStyles['items-list-title']}>Other items that might interest you</span>
      <div className={itemStyles['items-list']}>
        {relatedProducts.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
};

export default ItemsList;
