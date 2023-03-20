import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import ImageViewer from './ImageViewer';
import Details from './Details';
import Description from './Description';
import './products.css';
import { useGetProductInfoQuery } from '../../features/api/apiSlice';

function ProductDetails() {
  const params = useParams();

  const {
    data: productInfo,
    isFetching,
  } = useGetProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // update photos state
  }, [productInfo]);

  if (isFetching || !productInfo) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className="mainDiv">
        <div>
          <ImageViewer />
        </div>
        <div className="detailsDiv">
          <Details />
        </div>
      </div>
      <Description />
    </div>
  );
}

export default ProductDetails;
