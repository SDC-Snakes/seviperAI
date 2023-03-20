import React, { useState } from 'react';
import FormatCard from './FormatCard';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';

const OutfitList = function ({ itemStyles }) {
  const params = useParams();
  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  let { selectedStyle, styles } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const renderList = function (item, index) {
    return (
      <FormatCard
        key={index}
        name={item.details.name}
        category={item.details.category}
        image={item.photos.results[0].photos.url}
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
      <span className={itemStyles['items-list-title']}>Your outfit</span>
      <div className={itemStyles['items-list']}>
        {relatedProducts.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
};

export default OutfitList;
