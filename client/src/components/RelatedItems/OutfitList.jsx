import React, { useState } from 'react';
import FormatCard from './FormatCard';
import sampleData from './sampleData';
import { useParams } from "react-router-dom";
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';

const OutfitList = function ({ itemStyles }) {
  const params = useParams();
  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  console.log('FormatCard relatedProducts: ', relatedProducts);

  const renderList = function (item, index) {
    return (
      <FormatCard
        key={index}
        name={PLACEHOLDER.details.name}
        image={PLACEHOLDER.photos.results[0].photos.url}
        price={PLACEHOLDER.default_price}
        itemStyles={itemStyles}
      />
    );
  };

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
