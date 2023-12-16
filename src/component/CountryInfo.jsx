// src/components/CountryInfo.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryInfo = () => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`);
        setCountry(response.data[0]);
        const neighborCodes = response.data[0]?.borders || [];

        const neighborPromises = neighborCodes.map(async (code) => {
          const neighborResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
          return neighborResponse.data[0];
        });

        const neighborCountries = await Promise.all(neighborPromises);
        setNeighbors(neighborCountries);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, [cca3]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      
      <div className='detail'>
        <div className='detail-country'>
        <img src={country.flags.png} alt="" />
        <div className='country-name'>
          <p>{country.name.common}</p>
          <p>{country.name.official}</p>
        </div>
        <div className='country-pop'>
          <div className='population'>
          <p>Population<span className='line'>|</span>{country.population.toLocaleString()}</p>
          </div>
          <div className='area'>
          <p>Area(km²)<span  className='line'>|</span>{country.area.toLocaleString()}</p>
          </div>
        </div>
        </div>
   
        
        <div className='country-body'>
        <p>Capital</p>
        <p>{country.capital}</p>
        </div>
        
        <div className='country-body'>
        <p>Subregion</p>
        <p>{country.subregion}</p>
        </div>
        
        <div className='country-body'>
        <p>Language</p>
        <ul className='tags-list'>
        {country?.languages && 
        Object.values(country.languages).map((language) => (
        <li key={language} className='tag'>{language}</li>
        ))}
        </ul>
        </div>
        <div className='country-body'>
        <p>Currencies</p>
        <ul className='tags-list'>
        {country?.currencies && 
        Object.entries(country.currencies).map(([code, currency]) => (
        <li className='tag'>{currency.name} ({code})</li>
        ))}
        </ul>
        </div>
        <div className='country-body'>
        <p>ALT</p>
       <ul className='tags-list'>
        {country.altSpellings.map((tag, index) => (
        <li className="tag" key={index}>{tag}</li>
        ))}
        </ul>
       
        </div>
        <div className='country-body'>
        <p>Continent:</p>
        <p>{country.continents}</p>
        </div>
        <div className='neighbour'>
          <p>Neighbour Country</p>
          <div className='flag-neighbor'>
            {neighbors.map((neighbor) => (
              <img key={neighbor.flags.png} src={neighbor.flags.png}></img>
            ))}
          </div>
        </div>
        
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default CountryInfo;
