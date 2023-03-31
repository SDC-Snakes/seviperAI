import React from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import StyleImage from './StyleImage';
import { useGetProductStylesQuery } from '../../features/api/apiSlice';

function StyleList() {
  const params = useParams();
  const {
    data: styles,
    isFetching,
    isError,
  } = useGetProductStylesQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isError) {
    return null;
  }

  return (
    <div className="flex containCircles">
      {styles.results.map((style) => (
        <StyleImage
          image={style.photos[0].thumbnail_url}
          key={nanoid()}
          style={style}
        />
      ))}
    </div>
  );
}

export default StyleList;
