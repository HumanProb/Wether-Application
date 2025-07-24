import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const API_KEY = "c6cce38ca1966aa2878aeb4bedfb7749";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log("API Response:", res.data); // debug
      setWeather(res.data);
      setError("");
    } catch (err) {
      console.log("API Error:", err.response); // debug
      setWeather(null);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("City not found or API error.");
      }
    }
  };

  return (
    <div className="weather-app">
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        placeholder="Enter city (e.g., Delhi,London,New York)"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={!city.trim()}>
        Search
      </button>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>🌡 {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
