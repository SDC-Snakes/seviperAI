import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ImageViewer from './ImageViewer';
import Details from './Details';
import Description from './Description';
import './products.css';
import { useGetProductInfoQuery } from '../../features/api/apiSlice';

function ProductDetails({ handleScroll }) {
  const params = useParams();
  const navigate = useNavigate();
  const { expanded, zoom } = useSelector((state) => state.products);

  const {
    data: productInfo,
    isFetching,
    error,
  } = useGetProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(productInfo.styles.results);

  useEffect(() => {
    if (error) {
      navigate('/NotFound');
    }
  }, [productInfo, isFetching, error]);

  if (isFetching || !productInfo) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {expanded || zoom ? (
        <div className="mainDiv">
          <ImageViewer />
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
      <Description details={productInfo.details} />
    </div>
  );
}

export default ProductDetails;
