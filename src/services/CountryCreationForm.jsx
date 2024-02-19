import { useState } from "react";
import axios from "axios";
import { useCountryData } from "./useCountryData";
import Swal from "sweetalert2";


const CountryCreationForm = () => {
  const { country, setCode } = useCountryData();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    capital: "",
    continent: "",
    currency: "",
    languages: "",
  });

  const handleCodeChange = (e) => {
    const countryCode = e.target.value;
    setCode(countryCode.toUpperCase());
    setFormData({
      ...formData,
      code: countryCode,
    });
  };

  const handleConsultClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/country/countries",
        country
      );
      console.log("Consulta realizada con éxito:", response.data);
    } catch (error) {
      console.log("Error al consultar:", error);
    }
  };

  const handleCreateCountryClick = async () => {
    try {
      await axios
        .post("http://localhost:3000/country/countries", country)
        .then((response) => {
          if (Object.keys(response.data).length === 7) {
            console.log("Creado correctamente:", response.data);
            Swal.fire({
              title: "Successful Creation",
              text: "The country has been created successfully.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.log("Error al crear el país:", response.data);
            Swal.fire({
              title: "Error Creating Country",
              text: "The country already exists.",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } catch (error) {
      console.log("Error al crear el país:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error creating the country.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleClear = () => {
    console.log("clear");
    setFormData({
      code: "",
      name: "",
      capital: "",
      continent: "",
      currency: "",
      languages: "",
    });
    setCode("");
  };

  return (
    <div className="background">
      <div className="section-input">
        <form>
          <div className="container-input">
            <div className="left-input">
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  name="code"
                  placeholder="Code"
                  onBlur={handleCodeChange}
                />
                <div className="button-consult">
                  <button type="button" onClick={handleConsultClick}>
                    consult
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "48%" }}>
                <input
                  type="text"
                  placeholder="Name"
                  disabled
                  value={country?.name}
                />
              </div>
              <div style={{ width: "48%" }}>
                <input
                  type="text"
                  placeholder="Capital"
                  disabled
                  value={country?.capital}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "48%" }}>
                <input
                  type="text"
                  placeholder="Continent"
                  disabled
                  value={country?.continent?.name}
                />
              </div>
              <div style={{ width: "48%" }}>
                <input
                  type="text"
                  placeholder="Currency"
                  disabled
                  value={country?.currency}
                />
              </div>
            </div>
          </div>
          <div
            className="buttones"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            <button type="button" onClick={handleClear}>
              clear
            </button>
            <button type="button" onClick={handleCreateCountryClick}>
              create country
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CountryCreationForm;
