import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFirstProductQuery } from '../features/api/apiSlice';

function Spinner() {
  const navigate = useNavigate();

  const { data: products, isSuccess } = useGetFirstProductQuery();

  if (isSuccess) {
    navigate(`/${products[0].id}`);
  }

  return (
    <div>
      Loading...
    </div>
  );
}

export default Spinner;
