import React from 'react';
import logo from './WiredWardrobeLogo.png';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleState } from '../../features/products/productsSlice';

function Navbar({ handleScroll }) {
  const { dark } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleRelatedClick = () => {
    handleScroll('related');
  };

  const handleQnAClick = () => {
    handleScroll('qna');
  };

  const handleRnrClick = () => {
    handleScroll('rnr');
  };

  const setDark = (target) => {
    dispatch(toggleState('dark'));
  };

  return (
    <div className="navbar">
      <img src={logo} className="navbar-logo" alt="ww-logo" />
      <h1 className="navbar-title">WiredWardrobe</h1>
      <div className="navbar-headers">
        <h5 className="navbar-related navbar-sections" onClick={handleRelatedClick}>Related Items</h5>
        <h5 className="navbar-qna navbar-sections" onClick={handleQnAClick}>Questions & Answers</h5>
        <h5 className="navbar-reviews navbar-sections" onClick={handleRnrClick}>Ratings & Reviews</h5>
      </div>
      <div className="navbar-dark-container">
        <input id="dark-mode" type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
        <label htmlFor="dark-mode" className="dark-mode-toggle"></label>
      </div>
      <div className="navbar-search-container">
        <div className="navbar-search-bubble" />
        <FaSearch className="navbar-search-icon" />
        <input type="text" placeholder="Search" className="navbar-search" />
      </div>
      <div className="navbar-right-icons-container">
        <FaShoppingCart className="navbar-shopping-cart navbar-right-icon" />
        <FaUser className="navbar-person navbar-right-icon" />
      </div>
    </div>
  );
}

export default Navbar;
