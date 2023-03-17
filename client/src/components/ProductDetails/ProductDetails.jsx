import React, {useState, useEffect} from 'react';
import { useGetSpecificProductQuery } from '../../features/api/apiSlice';

function ProductDetails() {
  // first query before product id present

  const { data: products, isFetching, isSuccess } = useGetSpecificProductQuery({
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      Hello from ProductDetails
    </div>
  );
}

export default ProductDetails;
