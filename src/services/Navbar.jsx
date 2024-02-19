import { Link } from "react-router-dom";
import logo from "../assets/logo.png";


const Navbar = () => {
  return (
    <div className="menu-container">
      <div className="menu-items">
        <img src={logo} alt="logo" className="logo" />
        <Link to="/">Home</Link>
        <Link to="/country/countries">Create Country</Link>
        <Link to="/update">Update Country</Link>
      </div>
    </div>
  );
};

export default Navbar;
