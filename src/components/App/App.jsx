import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
/*import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";*/
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/itemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemsModal/AddItemModal";
// import { getItems } from "../../utils/api";
// import { removeItems } from "../../utils/api";
import api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");
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

  // const handleAddItemSubmit = (e) => {
  //   console.log(e);
  // };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  /*
  const onAddItem = (values) => {
    console.log(values);
  };
  */

  const handleAddItem = ({ name, weather, imageUrl, resetInputs }) => {
    console.log(name, weather, imageUrl);
    api
      .addItems(name, weather, imageUrl)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);

        closeActiveModal();
        resetInputs();
      })
      .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setcurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setcurrentTemperatureUnit("C");
  };

  const handleDeleteClick = (card) => {
    setActiveModal("delete-item");
    setSelectedCard(card);
  };

  const handleDeleteItem = (item) => {
    handleDeleteClick();
    api
      .removeItems(item._id)
      .then(() => {
        setClothingItems(clothingItems.filter((card) => card._id !== item._id));

        onClose();
      })
      .catch((err) => console.log(err));
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
    api
      .getItems()
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
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
        </div>

        <AddItemModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          //onAddItem={onAddItem}
          onClose={closeActiveModal}
          handleAddItem={handleAddItem}
        />
        {activeModal === "preview" && (
          <ItemModal
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteClick={handleDeleteItem}
            /* handleDeleteItem={handleDeleteItem} */
          />
        )}
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
