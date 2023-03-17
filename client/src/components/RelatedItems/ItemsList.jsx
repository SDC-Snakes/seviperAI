import React, { useState } from 'react';
import FormatCard from './FormatCard';

const ItemsList = (/*id, image, rating, prod_category, prod_name, price*/) => {

  const [relatedItemsList, setRelatedItemsList] = useState([]);

  const renderList = (item, index) => {
    return <FormatCard key={index} />
  };

  return(
    <div>
      {relatedItemsList.map((item, index) => renderList(item, index))}
    </div>
  )
};

export default ItemsList;
