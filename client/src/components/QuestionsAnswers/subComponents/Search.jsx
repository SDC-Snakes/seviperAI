import React from 'react';
import qnaStyles from '../qnaStyles.module.css';

function Search({ onSearch }) {
  return (
    <div id="search">
      <input
        type="text"
        placeholder="Have a question? Search for answers…"
        onChange={onSearch}
        aria-label="search-bar"
        className={qnaStyles['search-input']}
      />
    </div>
  );
}

export default Search;
