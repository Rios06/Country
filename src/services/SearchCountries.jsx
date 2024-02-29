import PropTypes from 'prop-types'; 
import { useEffect, useState } from "react";
import ApiGraph from "./ApiGraph";
import imgContinent from './Img';
import "../styles/Busqueda.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import useGetImageCountry from './useGetImageCountry';

export const SearchCountries = () => {
  const { countries, fetchAllCountries } = ApiGraph();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredContinent, setFilteredContinent] = useState("");
  const [showContinents, setShowContinents] = useState(false);

  const continents = [
    { name: "África", code: "Africa", image: imgContinent.Africa },
    { name: "Asia", code: "Asia", image: imgContinent.Asia },
    { name: "Europa", code: "Europe", image: imgContinent.Europe },
    { name: "América del Norte", code: "North America", image: imgContinent.NorthAmerica },
    { name: "Oceanía", code: "Oceania", image: imgContinent.Oceania },
    { name: "América del Sur", code: "South America", image: imgContinent.SouthAmerica },
  ];

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const getFlagImageUrl = (countryCode, style = "flat", size = 64) => {
    return `https://flagsapi.com/${countryCode}/${style}/${size}.png`;
  };

  const handleSearch = (value) => {
    const normalizedInput = value.toLowerCase();
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(normalizedInput)
    );
    setSearchResults(results);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  const handleContinentFilter = (continent) => {
    setFilteredContinent(continent);
    handleSearch(inputValue);
    setShowContinents(false); 
  };

  const filteredCountries = filteredContinent
    ? countries.filter((country) => country.continent.name === filteredContinent)
    : searchResults.length
    ? searchResults
    : countries;

  return (
    <div className="search">
      <div className="content-search">
        <div className="search-container">
          <div className="search-bar" onClick={() => setShowContinents(!showContinents)}>
            <div className="search-input">
              <div className="search-icon">
                <div className="search-icon-content">
                  <FontAwesomeIcon icon={faSearch} id="searchCountryIcon" />
                  <span>Look for</span>
                </div>
              </div>
              <label htmlFor="searchInput" className="search-label">Country</label>
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="write the country you want to see"
              />
            </div>
          </div>
          {showContinents && (
            <div className="continents">
              <h1>Filter by continents</h1> 
              <div className="clear-filter" onClick={() => {setShowContinents(false); setFilteredContinent(""); setInputValue(""); setSearchResults([]);}}>
                Clean
              </div>
              <div className="continent-images-container">
              {continents.map((continent) => (
                 <div
                 key={continent.code}
                 className={`continent-box ${filteredContinent === continent.code ? "selected" : ""}`}
                 onClick={() => handleContinentFilter(continent.code)}
                 style={{ cursor: "pointer" }}
               >
                 <img
                   src={continent.image}
                   alt={continent.name}
                   className="continent-image"
                 />
               </div>
              ))}
              </div>
            </div>
          )}
        </div>
        <div className="countries-container">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.code}
              country={country}
              selectedCountry={selectedCountry}
              onClick={() => setSelectedCountry(country === selectedCountry ? null : country)}
              getFlagImageUrl={getFlagImageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CountryCard = ({ country, selectedCountry, getFlagImageUrl }) => {
  const [expanded, setExpanded] = useState(false);
  const countryImageData = useGetImageCountry(country.name);

  const handleCardClick = () => {
    setExpanded(!expanded);
  };


  return (
    <motion.div
      className={`country-box ${selectedCountry === country ? "selected" : ""} ${expanded ? 'expanded' : ''}`}
      onClick={handleCardClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="top-section">
        <div className="image-wrapper">
          <img
            src={countryImageData.imageUrl}
            alt={country.name}
            className="country-image"
          />
        </div>
        <div className="info-wrapper">
          <h3>{country.name}</h3>
          <p>{country.continent.name}</p>
        </div>
        <div className="flag-wrapper">
          <img
            src={getFlagImageUrl(country.code)}
            alt="Flag"
            className="flag-image"
          />
        </div>
      </div>
      {expanded && (
        <div className="additional-info">
          <p>Capital: {country.capital}</p>
          <p>Currency: {country.currency}</p>
          <p>Languages: {country.languages.map((language) => language.name).join(", ")}</p>
        </div>

      )}
    </motion.div>
  );
};

CountryCard.propTypes = {
  country: PropTypes.object.isRequired,
  selectedCountry: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  getFlagImageUrl: PropTypes.func.isRequired,
};

export default SearchCountries;

