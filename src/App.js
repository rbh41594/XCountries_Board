import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Error fetching data");
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <h1>Country Flags</h1>
      {error && <p>{error}</p>}
      <div className="flag-container">
        {countries.map((country) => (
          <div key={country.name} className="flag-item">
            <img src={country.flag} alt={`${country.name} flag`} />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
