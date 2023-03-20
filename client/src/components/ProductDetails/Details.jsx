import React, { useState } from 'react';
import StarRating from '../ReviewsRatings/StarRating';
import StyleList from './StyleList';
import { newSelectedStyle } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { handleDropdown } from '../../features/products/productsSlice';

function Details() {
  let { selectedStyle, styles, details, sku } = useSelector((state) => state.products);
  const { quantity } = selectedStyle.skus[sku] || null;
  const dispatch = useDispatch();
  console.log(size)

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
        <select name="sku" onChange={(e) => dispatch(handleDropdown(e.target))}>
          <option value="selectSize">Select Size</option>
          {Object.keys(selectedStyle.skus).map(
            (sku) => (
              <option value={sku}>
                {selectedStyle.skus[sku].size}
              </option>
            ),
          )}
        </select>
        <select name="qty">
          {quantity.length
            ? quantity.map((qty) => (<option value={qty}>{qty}</option>))
            : <option>-</option>}
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
