import React, { useState } from 'react';

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState('Relevant');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    };

  return (
    <div>
      <label htmlFor="sort-options">Sort by:</label>
      <select id="sort-options" value={selectedOption} onChange={handleOptionChange}>Relevant
        <option value="Relevant">Relevant</option>
        <option value="Newest">Newest</option>
        <option value="Helpful">Helpful</option>
      </select>
    </div>
  );
}

export default Dropdown;
