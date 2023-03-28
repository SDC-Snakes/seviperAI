import React from 'react';

function Search({ onSearch }) {
  return (
    <div id="search-bar">
      <input
        type="text"
        placeholder="Have a question? Search for answers…"
        onChange={onSearch}
        style={{ width: "500px" }}
      />
    </div>
  );
}

export default Search;
