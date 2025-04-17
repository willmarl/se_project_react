import "./WeatherCard.css";
import cloudy from "../../assets/weather-pics/cloudy.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <img
        src={cloudy}
        alt="Weather condition art banner"
        className="weather-card__image"
      />
      <p className="weather-card__temperature">{weatherData.temp.F}&deg;F</p>
    </section>
  );
}
export default WeatherCard;
