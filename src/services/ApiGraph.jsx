import { useState, useEffect } from "react";

export const ApiGraph = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [code, setCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchCountryByCode = async (code) => {
    try {
      setIsFetching(true);
      const response = await fetch(`https://countries.trevorblades.com/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query Country($code: ID!) {
              country(code: $code) {
                code
                name
                capital
                continent {
                  code
                  name
                }
                currency
                languages {
                  name
                }
              }
            }`,
          variables: { code: code },
        }),
      });
      const data = await response.json();
      setCountry(data.data.country);
    } catch (error) {
      console.error("Error fetching country by code:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchAllCountries = async () => {
    try {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/country/countries");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching all countries:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllCountries(); // Obtener todos los países al montar el componente
  }, []);

  return { countries, country, code, setCode, fetchCountryByCode, fetchAllCountries, isFetching };
};

export default ApiGraph;