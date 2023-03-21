import React, { useState } from 'react';

function Dropdown({handleSortState}) {
  const [selectedOption, setSelectedOption] = useState('Relevant');
  const handleOptionChange = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
    handleSortState(selectedOption);
  };

  return (
    <div>
      <label htmlFor="sort-options">Sort by:</label>
      <select id="sort-options" value={selectedOption} onChange={(e) => {
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
