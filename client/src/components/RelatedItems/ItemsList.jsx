import React, { useState } from 'react';
import FormatCard from './FormatCard';
import sampleData from './sampleData';

const ItemsList = ({ itemStyles }) => {
  const [relatedItemsList, setRelatedItemsList] = useState(sampleData);

  const renderList = (item, index) => {
    return <FormatCard key={index} name={item.name} image={item.image} image={item.image} price={item.price} itemStyles={itemStyles}/>
  };

  return(
    <div className={itemStyles['items-list']}>
      <div>Other items that might interest you</div>
      {relatedItemsList.sampleData.map((item, index) => renderList(item, index))}
    </div>
  )
};

export default ItemsList;
