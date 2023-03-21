import React, { useState } from 'react';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import StyleList from './StyleList';
import { newSelectedStyle } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { handleDropdown } from '../../features/products/productsSlice';
import { FaHeart, FaTwitter, FaPinterest, FaFacebookF } from 'react-icons/Fa';

function Details() {
  let { selectedStyle, styles, details, sku } = useSelector((state) => state.products);
  const { meta } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  let { quantity } = selectedStyle.skus[sku] || 0;

  if (quantity > 15) {
    quantity = 15;
  }

  return (
    <div>
      <div>
        <QuarterStarsAverageRating productRating={meta.ratings} />
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
        <select name="sku" onChange={(e) => { dispatch(handleDropdown({ name: e.target.name, value: e.target.value })) }}>
          <option value="selectSize">Select Size</option>
          {Object.keys(selectedStyle.skus).map(
            (sizeSku) => (
              <option key={sizeSku} value={sizeSku}>
                {selectedStyle.skus[sizeSku].size}
              </option>
            ),
          )}
        </select>
        <select name="qty">
          {quantity
            ? Array.from({ length: quantity }, (_, i) => i + 1).map(
              (qty) => (<option key={qty} value={qty}>{qty}</option>),
            )
            : <option>-</option>}
        </select>
      </div>
      <div>
        <button type="button">
          Add to cart
        </button>
        <button type="button">
          <FaHeart />
        </button>
      </div>
      <FaTwitter />
      <FaPinterest />
      <FaFacebookF />
    </div>
  );
}

export default Details;
