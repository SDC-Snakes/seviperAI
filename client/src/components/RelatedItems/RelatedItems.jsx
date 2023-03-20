import React from 'react';
import ItemsList from './ItemsList';
import itemStyles from './Items.module.css';
import OutfitList from './OutfitList';
import CarouselList from './CarouselList';
import ComparisonModal from './ComparisonModal';

const RelatedItems = function () {
  return (
    <div>
      <CarouselList itemStyles={itemStyles} />
      {/* <ItemsList itemStyles={itemStyles} />
      <OutfitList itemStyles={itemStyles} /> */}
      <ComparisonModal itemStyles={itemStyles} />
    </div>
  );
};

export default RelatedItems;
