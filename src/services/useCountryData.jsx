
import { useState, useEffect } from "react";

export const useCountryData = () => {
  const [country, setCountry] = useState({});
  const [code, setCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const clearCountry = () => {
    setCountry({});
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(code);
      if (code) {
        try {
          setIsFetching(true);
          
          const response = await fetch("https://countries.trevorblades.com/", {
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
          console.error("Error country data:", error);
        } finally {
          setIsFetching(false);
        }
      } else {
        clearCountry(); // Limpia el estado de country si el código está vacío
      }
    };

    fetchData();
  }, [code]);

  return { country, setCode, isFetching };
};

export default useCountryData;
