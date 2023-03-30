import React from 'react';

function Navbar({ handleScroll }) {
  return (
    <div className="navbar">
      <h1 className="navbar-title">WiredWardrode</h1>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div className="navbar-headers">
        <h5 className="navbar-related">Related Items</h5>
        <h5 className="navbar-qna">Questions & Answers</h5>
        <h5 className="navbar-reviews">Ratings & Reviews</h5>
      </div>
      <input type="search" placeholder="Search" className="navbar-search" />
    </div>
  );
}

export default Navbar;
