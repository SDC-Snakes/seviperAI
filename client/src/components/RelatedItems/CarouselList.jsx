import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import ItemsList from './ItemsList';
import OutfitList from './OutfitList';
import { newCarouselIndex } from '../../features/related/relatedSlice';

const CarouselList = function () {
  let { carouselIndex, related } = useSelector((state) => state.related);
  const dispatch = useDispatch();

  const nextSlider = function () {
    dispatch(newCarouselIndex(carouselIndex + 3 === related.length ? 0 : carouselIndex + 1))
  }
  const prevSlider = function () {
    dispatch(newCarouselIndex(carouselIndex === 0 ? 0 : carouselIndex - 1))
  }

  return (
    <div>
      <div>
        <FaChevronLeft />
        <ItemsList />
        <FaChevronRight />
      </div>
      <div>
        <FaChevronLeft />
        <OutfitList />
        <FaChevronRight />
      </div>
    </div>
  )
};

export default CarouselList;
