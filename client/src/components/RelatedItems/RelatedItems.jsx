import React from 'react';
import ItemsList from './ItemsList';
import itemStyles from './Items.module.css';
import OutfitList from './OutfitList';

const RelatedItems = () => {
  return (
  <div>
    <ItemsList itemStyles={itemStyles}/>
    <OutfitList itemStyles={itemStyles}/>
  </div>
  );
}

export default RelatedItems;
