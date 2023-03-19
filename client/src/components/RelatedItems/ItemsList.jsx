import React, { useState } from 'react';
import FormatCard from './FormatCard';
import sampleData from './sampleData';

const ItemsList = function ({ itemStyles }) {
  const [relatedItemsList, setRelatedItemsList] = useState(sampleData);

  const renderList = function (item, index) {
    return (
      <FormatCard
        key={index}
        name={item.name}
        image={item.image}
        price={item.price}
        itemStyles={itemStyles}
      />
    );
  };

  return (
    <div>
      <span className={itemStyles['items-list-title']}>Other items that might interest you</span>
      <div className={itemStyles['items-list']}>
        {relatedItemsList.sampleData.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
};

export default ItemsList;
