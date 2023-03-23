import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormatCard from './FormatCard';
import ComparisonModal from './ComparisonModal';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';
import itemStyles from './Items.module.css';
import {
  newModalState,
  newRelatedProductName,
  newRelatedProductFeatures,
  generateProductFeatures,
  newCurrentProductName,
} from '../../features/related/relatedSlice';

function ItemsList({ relatedIndex }) {
  let { details } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const params = useParams();
  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  function findImage(item) {
    for (let i = 0; i < item.photos.results.length; i++) {
      const style = item.photos.results[i];
      for (let j = 0; j < style.photos.length; j++) {
        const stylePhoto = style.photos[j];
        if (stylePhoto.thumbnail_url) {
          return stylePhoto.thumbnail_url;
        }
      }
    }
  }

  // ATTEMPTED REFACTOR, DOES NOT WORK
  // const findImage = function (item) {
  //   for (let i = 0; i < item.photos.results.length; i++) {
  //     const style = item.photos.results[i];
  //     return style.photos.find(photo => photo.thumbnail_url);
  //   };
  // };

  function handleModalClick(e, item) {
    e.preventDefault();
    dispatch(newModalState());
    dispatch(newRelatedProductFeatures(item.details.features));
    dispatch(newRelatedProductName(item.details.name));
    dispatch(newCurrentProductName(details.name));
    dispatch(generateProductFeatures(details.features));
    console.log('relatedItemDetails: ', item);
  }

  function renderList(item, index) {
    return (
      <div key={index} onClick={(e) => {handleModalClick(e, item)}}>
        {relatedIndex <= index && (
          <FormatCard
            stars={<QuarterStarsAverageRating productRating={item.ratings.ratings} />}
            name={item.details.name}
            category={item.details.category}
            image={findImage(item)}
            price={item.details.default_price}
            itemStyles={itemStyles}
          />
        )}
      </div>
    );
  }

  if (isFetching) {
    return <div>loading...</div>;
  }

  return (
    <div className={itemStyles['items-list-wrapper']}>
      <ComparisonModal />
      <span className={itemStyles['items-list-title']}>Other items that might interest you</span>
      <div className={itemStyles['items-list-content']}>
        {relatedProducts.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );
}

export default ItemsList;
