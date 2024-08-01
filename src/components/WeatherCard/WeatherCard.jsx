import React from "react";
import "./WeatherCard.css";
import Cloudy from "../../assets/Cloudy.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg;F</p>
      <img src={Cloudy} alt="Cloudy" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
