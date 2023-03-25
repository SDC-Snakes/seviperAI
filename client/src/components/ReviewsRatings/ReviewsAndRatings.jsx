/* eslint-disable react/jsx-no-bind */
// this is the main reviews and ratings widget

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AverageRatings from './AverageRatings';
import Search from './SearchBarReviews';
import Reviews from './Reviews';
import RNRCSS from './Modal.module.css';
import { useGetProductReviewsQuery, useGetMetaReviewsQuery } from '../../features/api/apiSlice';

function ReviewsAndRatings() {
  const params = useParams();
  const [sortState, setSortState] = useState('relevant');
  const {
    data: metaReviews,
    isFetchingMeta,
  } = useGetMetaReviewsQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: false,
  });
  let count;
  metaReviews? count = Object.values(metaReviews.ratings).reduce((a, b) => (Number(a) + Number(b))): count = 5;

  const {
    data: productReviews,
    isFetching,
    refetch,
  } = useGetProductReviewsQuery({ id: params.productId, count, sortState }, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    // trigger({ id: params.productId, count, sortState });
    refetch();
  }, [sortState, refetch]);

  function handleSortState(sortInput) {
    setSortState(sortInput);
  }

  if (isFetching || isFetchingMeta || !productReviews || !metaReviews) {
    return (
      <div className={RNRCSS['loading-window']}>
        <h1>Ratings & Reviews</h1>
        <Search />
        <aside className={RNRCSS['average-ratings-left']}>
          <h3>Product Ratings</h3>
          <h3>Loading...</h3>
        </aside>
        <div className={RNRCSS['reviews-container-right']}>
          <h3>Product Reviews</h3>
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={RNRCSS['reviewsAndRatings-container-main']}>
      <div>
        <h1>Ratings & Reviews</h1>
        <Search />
        <AverageRatings RNRCSS={RNRCSS} />
        <Reviews RNRCSS={RNRCSS} handleSortState={handleSortState} sortState={sortState} />
      </div>

    </div>

  );
}

export default ReviewsAndRatings;
