import React, { useState } from "react";
import axios from "axios";

import "./styles.css";

export default function App() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});


  function fetchWeatherData(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.main.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(fetchWeatherData);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <button type="search">Search</button>
    </form>
  );

  if (loaded) {
    return (
        <div className="container">
          {form}
          {loaded && (
            <ul>
              <li>Temperature: {Math.round(weather.temperature)}°C</li>
              <li>Description: {weather.description}</li>
              <li>Humidity: {weather.humidity}%</li>
              <li>Wind: {weather.wind}km/h</li>
              <li>
                <img src={weather.icon} alt={weather.description} />
              </li>
            </ul>
          )}
        </div>
      );
    }}