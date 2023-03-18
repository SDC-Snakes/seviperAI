import React from 'react';
import ItemsList from './ItemsList';
import itemStyles from './Items.module.css';
import OutfitList from './OutfitList';
import ComparisonModal from './ComparisonModal';

const RelatedItems = () => {
  return (
  <div>
    <ItemsList itemStyles={itemStyles}/>
    <OutfitList itemStyles={itemStyles}/>
    <ComparisonModal itemStyles={itemStyles}/>
  </div>
  );
}

export default RelatedItems;
