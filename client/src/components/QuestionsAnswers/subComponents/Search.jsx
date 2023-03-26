import React from 'react';

function Search({ onSearch }) {
  return (
    <div id="search">
      SEARCH DIV
      <input type="text" placeholder="Search..." onChange={onSearch}/>
    </div>
  );
}

export default Search;
