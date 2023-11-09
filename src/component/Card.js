import React, { useEffect, useState } from 'react';
import Day from './Day';
import Graphe from './Graphe';

function Card({ city }) {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [temperatureData, setTemperatureData] = useState([]);
 
  //la récupération de l'api key passé en variable (important : on récup avec process.env)
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    //on passe l'url de l'api dans une variable
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
    //on fetch l'url passée dans l'url
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Échec de la requête API');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data.forecast.forecastday);

         // le formatage de la température pour le graphe
        const formattedTemperatureData = data.forecast.forecastday.map(
          (day) => day.day.avgtemp_c
        );
        setTemperatureData(formattedTemperatureData);
      })
      .catch((error) => {
        console.error(error);
      });
      //on passe un tableau de dépendances, ici on passe le state "[city]" qui est dans app.js, on peut passer plusieurs paramètres dans les dépendances.
  }, [city]);

  const selectedWeather = weatherData[selectedDay] || {};

  return (
    <>
      <div className="row">
        <div className="col s12 m6 push-m3">
          <div className="weather card">
            <div className="card-content white-text">
              <span className="card-title">{city}</span>
              <p><img src={selectedWeather.day?.condition?.icon} alt="weather-icon" /></p>
              <span className="temperature">
                {selectedWeather.day ? `${selectedWeather.day.avgtemp_c}°C` : ''}
              </span>
              <div className="wind">
                Vent :{' '}
                {selectedWeather.day
                  ? `${selectedWeather.day.maxwind_kph}km/h (${selectedWeather.hour[0].wind_degree}°)` : ''}
              </div>
              <Day setSelectedDay={setSelectedDay} />
              <Graphe temperatureData={temperatureData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
