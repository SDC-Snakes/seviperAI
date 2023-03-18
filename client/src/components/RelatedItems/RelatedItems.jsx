import React from 'react';
import ItemsList from './ItemsList';
import itemStyles from './Items.module.css';

const RelatedItems = () => {
  return (
  <div>
    <ItemsList itemStyles={itemStyles}/>
  </div>
  );
}

export default RelatedItems;
