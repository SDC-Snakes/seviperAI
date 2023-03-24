import React, { useState, useEffect } from 'react';

function Dropdown({handleSortState, sortState}) {
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    handleSortState(event.target.value);
   };

  return (
    <div>
      <label htmlFor="sort-options">Sort by:</label>
      <select id="sort-options" value={sortState} onChange={(e) => {
        handleOptionChange(e);
        }}>
        <option value="relevant">relevant</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}

export default Dropdown;
