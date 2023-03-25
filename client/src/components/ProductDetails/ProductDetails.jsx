import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ImageViewer from './ImageViewer';
import Details from './Details';
import Description from './Description';
import './products.css';
import { useGetProductInfoQuery } from '../../features/api/apiSlice';
import Spinner from '../SharedComponents/Spinner';

function ProductDetails({ handleScroll }) {
  const params = useParams();
  const navigate = useNavigate();
  const { expanded, zoom } = useSelector((state) => state.products);

  const {
    data: productInfo,
    isFetching,
    isError,
    error,
  } = useGetProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(productInfo.styles.results);

  useEffect(() => {
    if (error || isError) {
      navigate('/NotFound');
    }
  }, [productInfo, isFetching, error, isError]);

  if (isFetching || !productInfo) {
    return (<div><Spinner context="details" /></div>);
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
