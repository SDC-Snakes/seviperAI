import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import ItemsList from './ItemsList';
import OutfitList from './OutfitList';
import itemStyles from './Items.module.css';
import { newRelatedCarouselIndex } from '../../features/related/relatedSlice';

function Carousel() {
  let { relatedIndex, related } = useSelector((state) => state.related);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [cardsShowing, setCardsShowing] = useState(0);

  // Determine size of screen
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  function nextSlide() {
    dispatch(newRelatedCarouselIndex(relatedIndex === related.length - 1 ? 0 : relatedIndex + 1));
  }

  function prevSlide() {
    dispatch(newRelatedCarouselIndex(relatedIndex === 0 ? related.length - 1 : relatedIndex - 1));
  }

  return (
    <div>
      <div className={itemStyles['items-list-container']}>
        {relatedIndex !== 0 && <FaChevronLeft className={itemStyles['left-arrow']} onClick={prevSlide} />}
        <ItemsList relatedIndex={relatedIndex} />
        {(related.length > 5 && relatedIndex !== related.length - 5)
        && <FaChevronRight className={itemStyles['right-arrow']} onClick={nextSlide} />}
        {/* {relatedIndex !== related.length
        && <FaChevronRight className={itemStyles['right-arrow']} onClick={nextSlide} />} */}
      </div>
      <div>
        <FaChevronLeft />
        <OutfitList relatedIndex={0} />
        <FaChevronRight />
      </div>
    </div>
  );
}

export default Carousel;

// style={{ transform: `translateX(-${relatedIndex} * 25%)` }}
