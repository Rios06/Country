import { useEffect, useState } from 'react';
import ApiGraph from './ApiGraph';
import photo from '../assets/2.png'
import '../styles/Busqueda.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchCountries = () => {
  const { countries, fetchAllCountries } = ApiGraph();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearch = (value) => {
    const normalizedInput = value.toLowerCase();
    const results = countries.filter(country => country.name.toLowerCase().includes(normalizedInput));
    setSearchResults(results);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  useEffect(() => {
    fetchAllCountries(); 
  }, []);

  const getFlagImageUrl = (countryCode, style = 'flat', size = 64) => {
    return `https://flagsapi.com/${countryCode}/${style}/${size}.png`;
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country === selectedCountry ? null : country);
  };

  return (
    <div className="search">
      <div className="content-search">
        <div className="search-container">
          <div className="search-bar">
            <div className="search-icon">
              <div className="search-icon-content">
                <FontAwesomeIcon icon={faSearch} id="searchCountryIcon" />
                <span>Buscar</span>
              </div>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Search country by name"
            />
          </div>
        </div>
        <div className="countries-container">
          {(inputValue ? searchResults : countries).map((country) => (
            <div key={country.code} className="country-box" onClick={() => handleCountryClick(country)}>
              <div className="top-section">
                <img src={photo} alt="Flag" className="flag-image2" />
                <img src={getFlagImageUrl(country.code)} alt="Flag" className="flag-image" />
              </div>
              <div className="info-section">
                <h3>{country.name}</h3>
                <p>{country.continent.name}</p>
                {selectedCountry === country && (
                  <>
                    <p>Capital: {country.capital}</p>
                    <p>Currency: {country.currency}</p>
                    <p>Languages: {country.languages.map((language) => language.name).join(", ")}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCountries;