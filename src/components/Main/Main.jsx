import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard.jsx";
import arrow from "../../assets/circle-arrow.svg";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.jsx";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {[...clothingItems]
            .reverse()
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard key={item._id} item={item} onCardLike={onCardLike} />
              );
            })}
        </ul>
        <button className="cards__randomize-btn">
          <img
            src={arrow}
            alt="Randomize button"
            className="cards__randomize-btn__image"
          />
          Randomize
        </button>
      </section>
    </main>
  );
}
export default Main;
