//formulario de actualización
import { useState } from "react";

export const UpdateCountryForm = () => {
  const [country, setCountry] = useState({});
  const [inputValue, setValue] = useState("");

  const handleClick = () => {
    try {
      fetch(`http://localhost:3000/country/country/${inputValue}`)
        .then((response) => response.json())
        .then((data) => setCountry(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDelete = () => {
    try {
      fetch(`http://localhost:3000/country/country/${inputValue}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setCountry(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    try {
      fetch(`http://localhost:3000/country/country/${inputValue}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(country),
      })
        .then((response) => response.json())
        .then((data) => setCountry(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newName = name === "name" ? value : country.name;
    const newCapital = name === "capital" ? value : country.capital;
    const newContinent = name === "continent" ? value : country.continent;
    const newCurrency = name === "currency" ? value : country.currency;
    const newLanguages = name === "languages" ? value : country.languages;

    setCountry({
      code: country.code,
      name: newName,
      capital: newCapital,
      continent: newContinent,
      currency: newCurrency,
      languages: [...country.languages, newLanguages],
    });
  };

  console.log(country);

  return (
    <>
      <section className="section-update">
        <h1>Hello, Vista 3</h1>
        <section className="container-update">
          <div className="left-input">
            <label htmlFor="code">Code Country</label>
            <input
              type="text"
              id="code"
              
              onBlur={(e) => setValue(e.target.value)}
            />
            <button onClick={handleClick}>Consult</button>
          </div>
          <div className="right-input">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              id="code"
              defaultValue={country.code}
            />
             <label htmlFor="name">Name</label>
            <input
              type="text"
              name ="name"
              defaultValue={country.name}
              onBlur={handleChange}
            />
          </div>
          <div className="right-input">
            <label htmlFor="continent">Continent</label>
            <input
              type="text"
              name ="continent"
              defaultValue={country.continent?.name}
              onBlur={handleChange}
            />
            <label htmlFor="capital">Capital</label>
            <input
              type="text"
              name ="capital"
              defaultValue={country.capital}
              onBlur={handleChange}
            />
          </div>
          <div className="right-input">
            <label htmlFor="languages">Languages</label>
            <input
              type="text"
              name ="languages"
              defaultValue={country?.languages?.[0]?.name || ""}
              onBlur={handleChange}
            />
            <label htmlFor="currency">Currency</label>
            <input
              type="text"
              name ="currency"
              defaultValue={country.currency} 
              onBlur={handleChange}
            />
          </div>
        </section>
        <div className="buttons-container">
  <div className="button-update">
    <button onClick={handleUpdate}>Update Country</button>
  </div>
  <div className="button-delete">
    <button onClick={handleClickDelete}>Delete Country</button>
  </div>
</div>
      </section>
    </>
  );
};
