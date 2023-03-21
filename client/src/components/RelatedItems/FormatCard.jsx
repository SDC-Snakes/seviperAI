import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function FormatCard({ name, image, price, category, stars, itemStyles }) {
  return (
    <div className={itemStyles['items-card']}>
      <img className={itemStyles['items-card-img']} src={image} />
      <div>{stars}</div>
      <p className={itemStyles['product-category']}>{category}</p>
      <h6 className={itemStyles['product-name']}>{name}</h6>
      <p className={itemStyles['card-price']}>{price}</p>
    </div>
  );
};

export default FormatCard;
