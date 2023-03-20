import React, { useState } from 'react';
import FormatCard from './FormatCard';
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const ItemsList = function ({ itemStyles }) {
  console.log('FormatCard relatedProducts: ', relatedProducts);
  const params = useParams();
  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  const renderList = function (item, index) {
    return (
      <FormatCard
        key={index}
        name={item.details.name}
        category={item.details.category}
        image={item.photos.results[0].photos.thumbnail_url}
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
