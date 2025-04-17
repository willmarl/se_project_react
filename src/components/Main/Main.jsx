import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        Today is 75 &deg; F / You may want to wear:
      </section>
    </main>
  );
}
export default Main;
