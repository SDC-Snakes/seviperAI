import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const FormatCard = function ({ name, image, price, category, itemStyles }) {
  let related = useSelector((state) => state.related);
  // const dispatch = useDispatch();

  console.log('name FormatCard: ', name);
  console.log('image FormatCard: ', image);
  console.log('price FormatCard: ', price);
  console.log('category FormatCard: ', category);

  return (
    <div className={itemStyles['items-card']}>
      <img className={itemStyles['items-card-img']} src={image} />
      <div>Star rating</div>
      <h3 className={itemStyles['product-category']}>{category}</h3>
      <h6 className={itemStyles['product-name']}>{name}</h6>
      <p className={itemStyles['card-price']}>{price}</p>
    </div>
  );
};

export default FormatCard;
