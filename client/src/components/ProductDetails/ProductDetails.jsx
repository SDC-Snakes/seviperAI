import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import ImageViewer from './ImageViewer';
import Details from './Details';
import Description from './Description';
import './products.css';
import { useGetProductInfoQuery } from '../../features/api/apiSlice';

function ProductDetails({ handleScroll }) {
  const params = useParams();
  let { expanded, selectedImage } = useSelector((state) => state.products);

  const {
    data: productInfo,
    isFetching,
  } = useGetProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(productInfo.styles.results);

  useEffect(() => {
    // update photos state
  }, [productInfo]);

  if (isFetching || !productInfo) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {expanded ? (
        <div className="mainDiv">
          <div>
            <ImageViewer />
          </div>
        </div>
      ) : (
        <div className="mainDiv">
          <div>
            <ImageViewer />
          </div>
          <div className="detailsDiv">
            <Details handleScroll={handleScroll} />
          </div>
        </div>
      )}
      <Description />
    </div>
  );
}

export default ProductDetails;
