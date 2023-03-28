import React from 'react';

function Search({ onSearch }) {
  return (
    <div id="search">
      <input
        type="text"
        placeholder="Have a question? Search for answers…"
        onChange={onSearch}
        aria-label="search-bar"
        style={{ width: "500px" }}
      />
    </div>
  );
}

export default Search;
