import React, { useState } from 'react';
import StarRating from '../ReviewsRatings/StarRating';
import StyleList from './StyleList';
import { newSelectedStyle } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';

function Details() {
  let { selectedStyle, styles, details } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <StarRating />
        <button type="button">See all reviews</button>
      </div>
      <h3>
        {details.category}
      </h3>
      <h2>
        {details.name}
      </h2>
      <div className="flex">
        { selectedStyle.sale_price ? <p className="sale">{`$${selectedStyle.sale_price}`}</p> : null}
        <p className={selectedStyle.sale_price ? 'originalPrice' : ''}>
          {`$${selectedStyle.original_price}`}
        </p>
      </div>
      <h3>
        {selectedStyle.name}
      </h3>
      <div>
        <StyleList />
      </div>
      <div>
        <select defaultValue="Select a size">
          <option value="selectSize">Select Size</option>
          {Object.keys(selectedStyle.skus).map(
            (sku) => (<option value={sku.size}>{sku.size}</option>),
          )}
        </select>
        <select defaultValue="1">
          {[1, 2, 3, 4, 5].map((qty) => (<option value={qty}>{qty}</option>))}
        </select>
      </div>
      <div>
        <button>

        </button>
        <button>

        </button>
      </div>
    </div>
  );
}

export default Details;
