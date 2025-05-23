import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.condition === weatherData.condition &&
      option.day === weatherData.isDay
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.condition ? weatherOption?.condition : ""} ${
          weatherOption?.day ? "day" : "night"
        } time weather card`}
        className="weather-card__image"
      />
      <p className="weather-card__temperature">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
    </section>
  );
}
export default WeatherCard;
