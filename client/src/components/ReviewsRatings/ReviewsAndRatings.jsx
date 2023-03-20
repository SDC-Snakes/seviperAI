// this is the main reviews and ratings widget

import React from 'react';
import { useParams } from 'react-router-dom';
import AverageRatings from './AverageRatings';
import Search from './SearchBarReviews';
import Reviews from './Reviews';
import RNRCSS from './Modal.module.css';
import { useGetProductReviewsQuery } from '../../features/api/apiSlice';
import { useSelector, useDispatch } from 'react-redux';

function ReviewsAndRatings() {
  const params = useParams();

  let {reviews} = useSelector((state) => state.reviews);
  // console.log('reviews', reviews);
  const {
    data: productReviews,
    isFetching,
  } = useGetProductReviewsQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(productReviews);

  if (isFetching || !productReviews) {
    return <div>loading...</div>;
  }

  return (
    <div>
      Hello from RatingsReviews
      <Search />
      <AverageRatings />
      <Reviews RNRCSS={RNRCSS} />
    </div>
  );
}

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewsAndRatings;
