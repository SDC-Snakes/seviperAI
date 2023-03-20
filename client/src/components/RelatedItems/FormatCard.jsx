import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const FormatCard = function ({ name, image, price, category, starRating, itemStyles }) {
  // let related = useSelector((state) => state.related);
  // const dispatch = useDispatch();

  return (
    <div className={itemStyles['items-card']}>
      <img className={itemStyles['items-card-img']} src={image} />
      <div>{starRating}</div>
      <p className={itemStyles['product-category']}>{category}</p>
      <h6 className={itemStyles['product-name']}>{name}</h6>
      <p className={itemStyles['card-price']}>{price}</p>
    </div>
  );
};

export default FormatCard;
