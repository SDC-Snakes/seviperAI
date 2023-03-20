import React from 'react';
import { useParams } from "react-router-dom";
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';

const FormatCard = function({ image, category, name, price, itemStyles }) {
  const params = useParams();

  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  console.log('FormatCard relatedProducts: ', relatedProducts);

  return (
    <div className={itemStyles['items-card']}>
      <img className={itemStyles['items-card-img']} src={image} alt="Cheetah print t-shirt" />
      <div>Star rating</div>
      <h3 className={itemStyles['product-category']}>{category}</h3>
      <h6 className={itemStyles['product-name']}>{name}</h6>
      <p className={itemStyles['card-price']}>{price}</p>
    </div>
  );
};

export default FormatCard;
