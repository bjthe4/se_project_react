import WeatherCard from "../WeatherCard/WeatherCard.jsx";
// import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext.js";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
}) /*clothingItems delete handleCardClick, delete defaultClothingItems*/ {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;