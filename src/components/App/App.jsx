import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import loginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
// import { getItems } from "../../utils/api";
// import { removeItems } from "../../utils/api";
import api from "../../utils/api";
import ProtectedRoute from "../../utils/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  const navigate = useNavigate();

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

  const handleAddRegistration = () => {
    setActiveModal("registration-modal");
  };

  const handleShowLogin = () => {
    console.log("is this code working");
    setActiveModal("login-modal");
  };

  /*
  const onAddItem = (values) => {
    console.log(values);
  };
  */

  const handleAddItem = ({ name, weather, imageUrl }) => {
    console.log(name, weather, imageUrl);
    api
      .addItems(name, weather, imageUrl)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);

        closeActiveModal();
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
    // handleDeleteClick();
    api
      .removeItems(item._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems(clothingItems.filter((card) => card._id !== item._id));

        closeActiveModal();
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

  const handleRegistration = ({ email, password, name, avatarUrl }) => {
    auth
      .signup(email, password, name, avatarUrl)
      .then(() => {
        setUserData(email, password, name, avatarUrl);
        setCurrentUser(email, password);
        setIsLoggedIn(true);
        e.preventDefault();
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Error setting data:", err));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signIn(email, password)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", res.token);
        }
        return <Navigate to="/login" replace />;
      })
      .then((data) => {
        console.log("this is the data", data);
        setIsLoggedIn(true);
        e.preventDefault();
        closeActiveModal();
        navigate("/profile");
      })
      .catch(() => console.err("A login Error has occured", err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleAddRegistration={handleAddRegistration}
            />
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/login" />
                  )
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
            // resetInputs={resetInputs}
          />
          {activeModal === "preview" && (
            <ItemModal
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteClick={handleDeleteItem}
              /* handleDeleteItem={handleDeleteItem} */
            />
          )}
          {/*<RegisterModal handleUserRegister...*/}
          <Footer />
          <RegisterModal
            isOpen={activeModal === "registration-modal"}
            onClose={closeActiveModal}
            onSubmit={handleRegistration}
          />
          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={closeActiveModal}
            onSubmit={handleLogin}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
