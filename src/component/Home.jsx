import { useEffect, useState } from "react";
import Search from "./Search";

import { Link } from "react-router-dom";

import axios from "axios";


const url = "https://restcountries.com/v3.1/all"
function Home(){
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 25;

  
  


    useEffect(() => {
        const fetchCountries = async () => {
            try{
           
            const responses = await axios.get(url);
            setCountries(responses.data)
            setFilteredCountries(responses.data);
            }catch (error){
                console.error('Error fetching data:', error);
            }
        }

        fetchCountries()
    }, [])

   
 

    //   search 
    const handleSearch = (searchResults) => {
        setFilteredCountries(searchResults);
       
      };

    //sort
    const handleSort = () => {
      const sortedCountries = [...countries];
  
      if (sortOrder === 'asc') {
        sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setSortOrder('desc');
      } else {
        sortedCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
        setSortOrder('asc');
      }
  
      setCountries(sortedCountries);
    };
    
    // loading 
    const handleLoadMore = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
    const handleBack = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
    return(
      
        <body>
           
        <div className="container">
          <div className="found">
            {/* sort  */}
          <button onClick={handleSort} className="select">{sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
          {/* search  */}
          <Search onSearch={handleSearch} countries={countries}/>
           
          </div>
          
           <div className="row">
            {/* table  */}
            
            <table className="table">
            <tr className="t-row">
                <th className="title">Flag</th>
                <th className="title">Name</th>
                <th className="title">Population</th>
                <th className="title">Area (km²)</th>
                <th className="title">Region</th>
            </tr>
            <hr />
            {countriesToDisplay?.map((country) => (
            <tr className="t-data" key={(country.cca3)}>
               <Link to={`/country/${country.cca3}`}><img className="title-image" src={country.flags.png} alt={country.name} />
               </Link>
                <td className="title-data">
                    {country.name.common}
                </td>
                
                <td className="title-data">{country.population.toLocaleString()}</td>
                <td className="title-data">{country.area.toLocaleString()} (km²)</td>
                <td className="title-data">{country.region}</td>
            </tr>
            )
             )}
            </table>
            
            
        </div>
        <div className="loading">
       
        {currentPage > 1 && (
          <button onClick={handleBack} className="loading-button">Back</button>
        )}
         <span className="page-loading">
          Page {currentPage} of {totalPages}
        </span>
        {filteredCountries.length > endIndex && (
          <button onClick={handleLoadMore} className="loading-button">Next</button>
        )}
      </div>
     
        </div>
       
        </body>
       
    )
}
export default Home;