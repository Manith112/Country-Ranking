// src/components/CountryInfo.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CountryInfo = () => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`);
        setCountry(response.data[0]);
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
        
        <img src={country.flags.png} alt="" />
      <div className='text-details'>
        <div className='country'>
        <h3>Name:</h3>
        <h3>{country.name.official}</h3>
        </div>
        <div className='country-body'>
        <p>CCA2 Code:</p>
        <p>{country.cca2}</p>
        </div>
        <div className='country-body'>
        <p>CCA3 Code:</p>
        <p>{country.cca3}</p>
        </div>
        <div className='country-body'>
        <p>Native Name:</p>
        <p>{country.name.common}</p>
        </div>
        <div className='country-alt'>
        <p>ALT spelling:</p>
       <ul className='tags-list'>
        {country.altSpellings.map((tag, index) => (
        <li className="tag" key={index}>{tag}</li>
        ))}
        </ul>
       
        </div>
        <div className='country-body'>
        <p>Calling Code:</p>
        <p>{country.idd.root}</p>
        </div>
        </div>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default CountryInfo;
