import React, { useState } from 'react';
import FormatCard from './FormatCard';
import sampleData from './sampleData';

const OutfitList = ({ itemStyles }) => {
  const [outfitList, setOutfitList] = useState(sampleData);

  const renderList = (item, index) => {
    return <FormatCard key={index} name={item.name} image={item.image} image={item.image} price={item.price} itemStyles={itemStyles}/>
  };

  return(
    <div>
      <span className={itemStyles['items-list-title']}>Your outfit</span>
      <div className={itemStyles['items-list']}>
        {outfitList.sampleData.map((item, index) => renderList(item, index))}
      </div>
    </div>
  )
};

export default OutfitList;
