import React from 'react';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import StyleList from './StyleList';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateUpdate } from '../../features/products/productsSlice';
import { FaHeart, FaTwitter, FaPinterest, FaFacebookF } from 'react-icons/Fa';
import { useAddToCartMutation } from '../../features/api/apiSlice';
import {toast} from 'react-toastify';

function Details({ handleScroll }) {
  let { selectedStyle, details, sku, quantitySelected } = useSelector((state) => state.products);
  const { meta } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  let { quantity } = selectedStyle.skus[sku] || 0;
  const [trigger] = useAddToCartMutation();

  if (quantity > 15) {
    quantity = 15;
  }

  const handleCartClick = async () => {
    if (sku !== '' && sku !== 'selectSize') {
      const res = await trigger(sku);
      if (res.data === 'Content created') {
        toast.success(`${details.name}, ${selectedStyle.name}, size: ${selectedStyle.skus[sku].size}, quantity: ${quantitySelected} added to cart successfully`);
      } else {
        toast.error('Unable to add to cart');
      }
    } else {
      toast.error('Unable to add to cart: please select a size');
    }
  };

  const handleRnrClick = () => {
    handleScroll();
  };
  console.log(meta.ratings);

  return (
    <div>
      <div>
        <QuarterStarsAverageRating productRating={meta.ratings} />
        <button type="button" onClick={handleRnrClick}>See all reviews</button>
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
        <select name="sku" onChange={(e) => { dispatch(handleStateUpdate({ name: e.target.name, value: e.target.value })); }}>
          <option value="selectSize">Select Size</option>
          {Object.keys(selectedStyle.skus).map(
            (sizeSku) => (
              <option
                key={sizeSku}
                value={sizeSku}
                disabled={!selectedStyle.skus[sizeSku].quantity}
              >
                {selectedStyle.skus[sizeSku].size}
              </option>
            ),
          )}
        </select>
        <select name="quantitySelected" onChange={(e) => { dispatch(handleStateUpdate({ name: e.target.name, value: e.target.value })); }}>
          {quantity
            ? Array.from({ length: quantity }, (_, i) => i + 1).map(
              (qty) => (<option key={qty} value={qty}>{qty}</option>),
            )
            : <option>-</option>}
        </select>
      </div>
      <div>
        <button type="button" onClick={handleCartClick}>
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
