import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import ItemsList from './ItemsList';
import OutfitList from './OutfitList';
import { newRelatedCarouselIndex } from '../../features/related/relatedSlice';

const CarouselList = function ({ itemStyles }) {
  let { relatedIndex, related } = useSelector((state) => state.related);
  const dispatch = useDispatch();

  const nextSlide = function () {
    dispatch(newRelatedCarouselIndex(relatedIndex === related.length - 1 ? 0 : relatedIndex + 1));
  };
  const prevSlide = function () {
    dispatch(newRelatedCarouselIndex(relatedIndex === 0 ? related.length - 1 : relatedIndex - 1));
  };

  return (
    <div>
      <div className={itemStyles['items-list-container']}>
        {relatedIndex !== 0 && <FaChevronLeft className={itemStyles['left-arrow']} onClick={prevSlide} />}
        <ItemsList itemStyles={itemStyles} relatedIndex={relatedIndex} />
        {relatedIndex !== related.length - 5 && <FaChevronRight className={itemStyles['right-arrow']} onClick={nextSlide} />}
      </div>
      <div>
        {/* <FaChevronLeft />
        <OutfitList />
        <FaChevronRight /> */}
      </div>
    </div>
  );
};

export default CarouselList;

// style={{ transform: `translateX(-${relatedIndex} * 25%)` }}
