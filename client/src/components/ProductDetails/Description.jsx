import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useGetSpecificProductQuery } from '../../features/api/apiSlice';

function Description() {
  const params = useParams();
  const {
    data: details,
    isFetching,
    isError,
  } = useGetSpecificProductQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isError) {
    return null;
  }

  return (
    <div className="description flex">
      <div className="description-card center">
        <h3>{details.slogan}</h3>
        {details.description}
      </div>
      <div className="features-card">
        <ol>
          {details.features.map((item) => {
            const { feature, value } = item;
            return value ? (
              <li className="feature-item center" key={`${feature}${value}`}>
                <FaRegCheckCircle />
                &nbsp;
                {`  ${feature}  :  ${value}`}
              </li>
            ) : null;
          })}
        </ol>
      </div>
    </div>
  );
}

export default Description;
