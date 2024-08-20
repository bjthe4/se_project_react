import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
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
import { getItems } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, securrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Add Clothes clicked");
    setActiveModal("add-garment");
  };

  const handleAddItemSubmit = (e) => {
    console.log(e);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values) => {
    console.log(values);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") securrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") securrentTemperatureUnit("C");
  };

  const handleDeleteClick = (card) => {
    setActiveModal("delete-item");
    setSelectedCard(card);
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

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                // pass clothingItems as a prop
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
        </div>

        <AddItemModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteClick={handleDeleteClick}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
