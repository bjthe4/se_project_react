import { useEffect, useState } from "react";
/*import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";*/
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "./Header/Header";
import Main from "../Main/Main.jsx";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/itemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemsModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, securrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Add Clothes clicked");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (e) => {
    console.log(e);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") securrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") securrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  console.log(currentTemperatureUnit);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        </div>
        {}
        <AddItemModal
          closeActiveModal={closeActiveModal}
          isopen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
