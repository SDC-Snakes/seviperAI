// this is the Search Bar component for reviews and ratings
import React, { useState } from "react";

function Search({handleSearch}) {
  const [searchInput, setSearchInput] = useState('');
  const SearchFunc = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div>
      <input className="wordSearch" type="text" placeholder="search..." value={searchInput} onChange={SearchFunc} />
      <input type="submit" value="search" onClick={()=>{handleSearch(searchInput)}}/>
    </div>
  )
}

export default Search;