import { useEffect, useState } from "react";
import ApiGraph from "./ApiGraph";
import "../styles/Busqueda.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export const SearchCountries = () => {
  const { countries, fetchAllCountries } = ApiGraph();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredContinent, setFilteredContinent] = useState("");

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
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const getFlagImageUrl = (countryCode, style = "flat", size = 64) => {
    return `https://flagsapi.com/${countryCode}/${style}/${size}.png`;
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country === selectedCountry ? null : country);
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
              placeholder="Buscar país por nombre"
            />
          </div>
          <div className="filter-container">
            <h3>Filtrar por continente:</h3>
            <select
              value={filteredContinent}
              onChange={(e) => handleContinentFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Africa">África</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="North America">América del Norte</option>
              <option value="Oceania">Oceanía</option>
              <option value="South America">América del Sur</option>
            </select>
          </div>
        </div>
        <div className="countries-container">
          {filteredCountries.map((country) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
              }}
              key={country.code}
              className={`country-box ${
                selectedCountry === country ? "selected" : ""
              }`}
              onClick={() => handleCountryClick(country)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="top-section">
                <img
                  src={getFlagImageUrl(country.code)}
                  alt="Flag"
                  className="flag-image"
                />
              </div>
              <div className="info-section">
                <h3>{country.name}</h3>
                <p>{country.continent.name}</p>
                {selectedCountry === country && (
                  <div className="additional-info">
                    <p>Capital: {country.capital}</p>
                    <p>Moneda: {country.currency}</p>
                    <p>
                      Idiomas:{" "}
                      {country.languages
                        .map((language) => language.name)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCountries;
