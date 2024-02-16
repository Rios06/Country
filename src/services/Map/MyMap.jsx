import { useState} from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../../data/countries.json";
import "leaflet/dist/leaflet.css";


const MyMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const blueColors = ["#4ca1f5", "#1e91ed", "#1887e2", "#7cb7f8"];

  const countryStyle = (feature) => {
    const countryName = feature.properties.ADMIN;
    const isHovered = countryName === hoveredCountry;

    return {
      fillColor: blueColors[Math.floor(Math.random() * blueColors.length)],
      fillOpacity: isHovered ? 1 : 0.8, 
      color: "white", 
      weight: 1.5, 
      
    };
  };

  const onCountryMouseOver = (event) => {
    const layer = event.target;
    const countryName = layer.feature.properties.ADMIN;
    setHoveredCountry(countryName);
    layer.setStyle({
    fillOpacity: 1,
    });
  };

  const onCountryMouseOut = (event) => {
    const layer = event.target;
    setHoveredCountry(null);
    layer.setStyle({
      fillOpacity: 0.8,
    });
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindTooltip(countryName);
    layer.on({
      mouseover: onCountryMouseOver,
      mouseout: onCountryMouseOut,
    });
  };


  return (
    <div>
      <h1 style={{ textAlign: "center" }}></h1>
      <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
};

export default MyMap;

