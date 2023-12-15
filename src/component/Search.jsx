// FuzzySearchCountries.js
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const Search = ({ countries, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const performSearch = () => {
    const searchResults = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Call the onSearch callback with the results
    onSearch(searchResults);
  };

  // Use the helper function inside useEffect with dependencies
  useEffect(() => {
    performSearch();
  }, [searchTerm, countries, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
    <div className="found">
            
            < input type="text" 
            placeholder="Search by Name, Region, Subregion" 
            className="input-text"
            value={searchTerm}
            onChange={handleInputChange}/>
            </div>
           </>   
  );
};

export default Search;
