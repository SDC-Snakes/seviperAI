import React, { useState } from 'react';
import FormatCard from './FormatCard';
import sampleData from './sampleData';
import { useParams } from "react-router-dom";
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';

const OutfitList = function ({ itemStyles }) {
  const [outfitList, setOutfitList] = useState(sampleData);
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
        name={item.name}
        image={item.image}
        price={item.price}
        itemStyles={itemStyles}
      />
    );
  };

  return (
    <div>
      <span className={itemStyles['items-list-title']}>Your outfit</span>
      <div className={itemStyles['items-list']}>
        {outfitList.sampleData.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
};

export default OutfitList;
