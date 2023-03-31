import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Navbar({ handleScroll }) {
  return (
    <div className="navbar">
      <h1 className="navbar-title">WiredWardrode</h1>
      <div className="navbar-headers">
        <h5 className="navbar-related">Related Items</h5>
        <h5 className="navbar-qna">Questions & Answers</h5>
        <h5 className="navbar-reviews">Ratings & Reviews</h5>
      </div>
      <div className="navbar-search-container">
        <div className="navbar-search-bubble" />
        <FaSearch />
        <input type="search" placeholder="Search" className="navbar-search" />
      </div>
    </div>
  );
}

export default Navbar;
