import React from 'react';

const FormatCard = ({ image, category, name, price }) => (

  <div className='relatedItemsCard'>
    <img className='card-img' src={image}/>
    <div>Star rating</div>
    <h3 className='product-category'>{category}</h3>
    <h6 className='product-name'>{name}</h6>
    <p className='card-price'>{price}</p>
  </div>
  )

export default FormatCard;
