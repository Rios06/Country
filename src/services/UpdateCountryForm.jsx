import { useState } from "react";
import Swal from "sweetalert2";

export const UpdateCountryForm = () => {
  const [country, setCountry] = useState({});
  const [inputValue, setValue] = useState("");

  const handleClick = () => {
    try {
      fetch(`http://localhost:3000/country/country/${inputValue}`)
        .then((response) => {
          if (!response.ok) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "the code does not exist",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          return response.json();
        })
        .then((data) => setCountry(data));
    } catch (error) {
      console.log(error, "Error al traer los datos");
    }
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete the country?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(`http://localhost:3000/country/country/${inputValue}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
              setCountry(data);
              Swal.fire(
                "Deleted!",
                "Your country has been deleted.",
                "success"
              );
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleUpdate = async () => {
    const confirmation = await Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update the country?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/country/country/${inputValue}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(country),
          }
        );
        const data = await response.json();
        setCountry(data);
        Swal.fire("Updated!", "Your country has been updated.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "An error occurred during update.", "error");
      }
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
              onBlur={(e) => setValue(e.target.value.toUpperCase())}
            />
            <button onClick={handleClick}>Consult</button>
          </div>
          <div className="right-input">
            <label htmlFor="code">Code</label>
            <input type="text" id="code" defaultValue={country.code} />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={country.name}
              onBlur={handleChange}
            />
          </div>
          <div className="right-input">
            <label htmlFor="continent">Continent</label>
            <input
              type="text"
              name="continent"
              defaultValue={country.continent?.name}
              onBlur={handleChange}
            />
            <label htmlFor="capital">Capital</label>
            <input
              type="text"
              name="capital"
              defaultValue={country.capital}
              onBlur={handleChange}
            />
          </div>
          <div className="right-input">
            <label htmlFor="languages">Languages</label>
            <input
              type="text"
              name="languages"
              defaultValue={country?.languages?.[0]?.name || ""}
              onBlur={handleChange}
            />
            <label htmlFor="currency">Currency</label>
            <input
              type="text"
              name="currency"
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

export default UpdateCountryForm;

