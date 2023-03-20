import React from 'react';

const FormatCard = function ({ image, category, name, price, itemStyles }) {
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
