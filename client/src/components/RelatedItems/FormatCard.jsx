import React from 'react';
import itemStyles from './Items.module.css';

const FormatCard = ({ image, category, name, price }) => (
  <div className={itemStyles['related-items-card']}>
    <img className={itemStyles['card-img']} src={image}/>
    <div>Star rating</div>
    <h3 className={itemStyles['product-category']}>{category}</h3>
    <h6 className={itemStyles['product-name']}>{name}</h6>
    <p className={itemStyles['card-price']}>{price}</p>
  </div>
  )

export default FormatCard;
