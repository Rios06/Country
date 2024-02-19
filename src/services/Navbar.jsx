import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="menu-container">
      <div className="menu-items">
        <img src={logo} alt="logo" className="logo" />
        <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
        <NavLink to="/country/countries" activeClassName="active-link">Create Country</NavLink>
        <NavLink to="/update" activeClassName="active-link">Update Country</NavLink>
        <p className="date">{currentDate}</p>
      </div>
    </div>
  );
};

export default Navbar;

