import React from 'react';
import itemStyles from './Items.module.css';
import CarouselList from './CarouselList';
import ComparisonModal from './ComparisonModal';

function RelatedItems() {
  return (
    <div>
      <CarouselList itemStyles={itemStyles} />
      <ComparisonModal itemStyles={itemStyles} />
    </div>
  );
}

export default RelatedItems;
