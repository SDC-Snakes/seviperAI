import React from 'react';
import itemStyles from './Items.module.css';

function FormatCard({ name, image, price, category, stars }) {
  return (
    <div className={itemStyles['items-card']}>
      <img className={itemStyles['items-card-img']} src={image} alt="" />
      <div>{stars}</div>
      <p className={itemStyles['product-category']}>{category}</p>
      <h6 className={itemStyles['product-name']}>{name}</h6>
      <p className={itemStyles['card-price']}>{price}</p>
    </div>
  );
};

export default FormatCard;
