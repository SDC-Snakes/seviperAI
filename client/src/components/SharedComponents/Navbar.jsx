import React from 'react';
import logo from './WiredWardrobeLogo.png';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

function Navbar({ handleScroll }) {
  return (
    <div className="navbar">
      <img src={logo} className="navbar-logo" alt="ww-logo" />
      <h1 className="navbar-title">WiredWardrobe</h1>
      <div className="navbar-headers">
        <h5 className="navbar-related navbar-sections">Related Items</h5>
        <h5 className="navbar-qna navbar-sections">Questions & Answers</h5>
        <h5 className="navbar-reviews navbar-sections">Ratings & Reviews</h5>
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
