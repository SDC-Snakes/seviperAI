/* eslint-disable react/prop-types */
import React from 'react';

function Dropdown({ handleSortState, sortState }) {
  const handleOptionChange = (event) => {
    handleSortState(event.target.value);
  };

  return (
    <div>
      <span htmlFor="sort-options">Sort by </span>
      <select
        id="sort-options"
        value={sortState}
        onChange={(e) => {
          handleOptionChange(e);
        }}
      >
        <option value="relevant">relevant</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}

export default Dropdown;
