import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateCountry } from './services/CreateCountry';
import { useCountryData } from './services/useCountryData';
import { UpdateCountry } from './services/UpdateCountry';
import BuscarPais from './services/BuscarPais'
import Navbar  from './services/Navbar';
import './styles/App.css';


const App = () => {
  const { country, setCode } = useCountryData();
  return (
    <Router>
     
      <div className="app-container">
    <Navbar/>
        <Routes>
          <Route path="/" element={<BuscarPais country={country} setCode={setCode} />} />
          <Route path="/country/countries" element={<CreateCountry />} />
          <Route path="/update" element={<UpdateCountry />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
