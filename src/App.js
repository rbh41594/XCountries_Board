import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Error fetching data");
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const data = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(data);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredCountries);

  return (
    <div className="App">
      <h1>Country Flags</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="flag-container">
        {filteredCountries.map((country) => (
          <div key={country.name} className="countryCard">
            <img src={country.flag} alt={`${country.name} flag`} />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
