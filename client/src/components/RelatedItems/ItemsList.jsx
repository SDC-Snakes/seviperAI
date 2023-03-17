import React, { useState } from 'react';
import FormatCard from './FormatCard';
import sampleData from './sampleData';

const ItemsList = (/* id, image, rating, prod_category, prod_name, price */) => {

  const [relatedItemsList, setRelatedItemsList] = useState(sampleData);

  const renderList = (item, index) => {
    return <FormatCard key={index} name={item.name} image={item.image} image={item.image} price={item.price} />
  };

  return(
    <div>
      {relatedItemsList.map((item, index) => renderList(item, index))}
    </div>
  )
};

export default ItemsList;
