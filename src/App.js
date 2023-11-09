import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import Card from './component/Card';
import Graphe from './component/Graphe';
import './App.css';

function App() {
  const [city, setCity] = useState('Lyon'); 
  const [searchCity, setSearchCity] = useState('');
  const [temperatureData, setTemperatureData] = useState([]); 

  const handleCityChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSearch = () => {
    setCity(searchCity);
  };
  
  useEffect(() => {

  }, [city]);

  return (
    <>
      <Header />
      <div className="search-container">
        <input type="text" placeholder="Entrez une ville" value={searchCity} onChange={handleCityChange} />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <Card city={city} />
      <Graphe temperatureData={temperatureData} /> 
    </>
  );
}

export default App;
