// this is the main reviews and ratings widget

import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AverageRatings from './AverageRatings';
import Search from './SearchBarReviews';
import Reviews from './Reviews';
import RNRCSS from './Modal.module.css';
import { useGetProductReviewsQuery, useGetMetaReviewsQuery } from '../../features/api/apiSlice';

function ReviewsAndRatings() {
  const params = useParams();

  let {reviews} = useSelector((state) => state.reviews);

  // console.log('reviews', reviews);
  const count = 9;
   const [sortState, setSortState] = useState('relevant');
   function handleSortState(sortInput) {
    return setSortState(sortInput);
   }
  const {
    data: productReviews,
    isFetching,
  } = useGetProductReviewsQuery({ id: params.productId, count, sortState }, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: metaReviews,
    isFetchingMeta,
  } = useGetMetaReviewsQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isFetchingMeta || !productReviews || !metaReviews) {
    return <div>loading...</div>;
  }

  return (
    <div className={RNRCSS['reviewsAndRatings-container-main']}>
      <div>
        <h1>Ratings & Reviews</h1>
        <Search />
        <AverageRatings RNRCSS={RNRCSS} />
        <Reviews RNRCSS={RNRCSS} handleSortState={handleSortState} />
      </div>

    </div>

  );
}

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewsAndRatings;
