import React, { useRef, useState, useEffect } from 'react';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import StyleList from './StyleList';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateUpdate } from '../../features/products/productsSlice';
import {
  FaHeart, FaTwitter, FaPinterest, FaFacebookF
} from 'react-icons/fa';
import { useAddToCartMutation, api } from '../../features/api/apiSlice';
import { newOutfitList, newAddToOutfit } from '../../features/related/relatedSlice';
import {toast} from 'react-toastify';

function Details({ handleScroll }) {
  const [stock, setStock] = useState(true);
  const [update] = api.endpoints.getProductInfo.useLazyQuery();
  const {
    selectedStyle,
    details,
    sku,
    quantitySelected,
  } = useSelector((state) => state.products);
  const { meta } = useSelector((state) => state.reviews);

  const dispatch = useDispatch();
  let { quantity } = selectedStyle.skus[sku] || 0;
  const [trigger] = useAddToCartMutation();
  const sizeRef = useRef(null);

  const checkStock = () => {
    const values = Object.values(selectedStyle.skus);

    if (values.length > 0) {
      const inStock = values.reduce((accum, val) => accum + val.quantity, 0);
      return !!inStock;
    }
    return false;
  };

  useEffect(() => {
    setStock(checkStock());
  }, []);

  if (quantity > 15) {
    quantity = 15;
  }

  const handleCartClick = async () => {
    if (sku !== '' && sku !== 'selectSize') {
      const res = await trigger(sku);
      if (res.data === 'Content created') {
        toast.success(`${details.name}, ${selectedStyle.name}, size: ${selectedStyle.skus[sku].size}, quantity: ${quantitySelected} added to cart successfully`);
        dispatch(handleStateUpdate({ name: 'sku', value: 'selectSize' }));
        update(details.id);
        sizeRef.value = 'selectSize';
      } else {
        toast.error('Unable to add to cart');
      }
    } else if (!stock) {
      toast.error('Sorry, this item is out of stock. Please check back later. We apologize for the inconvenience!');
    } else {
      sizeRef.current.focus();
      sizeRef.current.size = 6;
      toast.error('Unable to add to cart: please select a size');
    }
  };

  const handleOutfitClick = () => {
    if (!JSON.parse(localStorage.getItem(details.id))) {
      dispatch(newAddToOutfit({ details, selectedStyle, meta }));
    }
    dispatch(newOutfitList());
  };

  const handleRnrClick = () => {
    handleScroll('rnr');
  };

  const handleSizeClick = (e) => {
    if (e.target.size > 0) {
      sizeRef.current.size = 0;
    }
    dispatch(handleStateUpdate({ name: e.target.name, value: e.target.value }));
  };

  return (
    <div className="detailsBar">
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
      <div className="dropdowns">
        <select className="size-selector" name="sku" onChange={handleSizeClick} disabled={!stock} id="sizeBtn" ref={sizeRef} value={sku}>
          <option value={stock ? 'selectSize' : 'outOfStock'}>{stock ? 'Select Size' : 'Out Of Stock'}</option>
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
        <select className="qty-selector" name="quantitySelected" onChange={(e) => { dispatch(handleStateUpdate({ name: e.target.name, value: e.target.value })); }}>
          {quantity
            ? Array.from({ length: quantity }, (_, i) => i + 1).map(
              (qty) => (<option key={qty} value={qty}>{qty}</option>),
            )
            : <option>-</option>}
        </select>
      </div>
      <div className="dropdowns">
        <button className="cart-btn" type="button" onClick={handleCartClick}>
          Add to cart
        </button>
        <button className="outfit-btn" type="button" onClick={handleOutfitClick}>
          <FaHeart />
        </button>
      </div>
      <div className="socials">
        <a className="social-icon center" href={`https://twitter.com/intent/tweet?url=${process.env.APP_URL}/${details.id}`} target="_blank" rel="noreferrer" aria-label="Share to Twitter"><FaTwitter className="twitter" /></a>
        <a className="social-icon center" href={`https://www.facebook.com/sharer.php?u=${process.env.APP_URL}/${details.id}`} target="_blank" rel="noreferrer" aria-label="Share to Twitter"><FaFacebookF className="facebook" /></a>
        <a className="social-icon center" href={`http://pinterest.com/pin/create/link/?url=${process.env.APP_URL}/${details.id}`} target="_blank" rel="noreferrer" aria-label="Share to Twitter"><FaPinterest className="pinterest" /></a>
      </div>
    </div>
  );
}

export default Details;
