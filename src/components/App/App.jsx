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
import RegisterModal from "../RegisterModal/RegisterModal";
// import { getItems } from "../../utils/api";
// import { removeItems } from "../../utils/api";
import api from "../../utils/api";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// import auth from "../../utils/auth";
import * as auth from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
    _id: "",
    token: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    avatarURl: "",
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

  const handleEditModal = () => {
    setActiveModal("edit-profile");
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
    setActiveModal("login-modal");
  };

  const handleEditProfileSubmit = (name, avatarURl) => {
    api
      .editData(name, avatarURl, localStorage.getItem("jwt"))
      .then((user) => {
        setUserData({
          ...userData,
          name: user.name || name,
          avatarURl: user.avatarURl || avatarURl,
        });
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };
  /*
  const onAddItem = (values) => {
    console.log(values);
  };
  */

  const handleAddItem = ({ name, weather, imageUrl }) => {
    api
      .addItems(name, weather, imageUrl, localStorage.getItem("jwt"))
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        console.log(newItem, clothingItems);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };
  console.log(clothingItems);
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setcurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setcurrentTemperatureUnit("C");
  };

  // const handleDeleteClick = (card) => {
  //   setActiveModal("delete-item");
  //   setSelectedCard(card);
  // };

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
        // console.log(filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // console.log(currentTemperatureUnit);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        // console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleRegistration = ({ email, password, name, avatarUrl }) => {
    auth
      .signUp(email, password, name, avatarUrl)
      .then(() => {
        setUserData(email, password, name, avatarUrl);
        // setCurrentUser(email, password);
        // setIsLoggedIn(true);
        handleLogin({ email, password });
        // e.preventDefault();
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
        console.log(data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
        }
        // return <Navigate to="/login" replace />;
        // console.log("this is the data", data);

        setIsLoggedIn(true);
        setCurrentUser(data.user);
        // e.preventDefault();
        closeActiveModal();
        navigate("/profile");
      })
      // .then((data) => {
      // })
      .catch((err) => console.error("A login Error has occured", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    // console.log("signout");

    setIsLoggedIn(false);
    setCurrentUser({ email: "", password: "" });
    navigate("/");
  };

  // console.log(currentUser);
  const handleCardLike = ({ _id, likes }) => {
    // console.log(_id);
    // console.log(isLiked);
    // there is no isLiked, you have just likes array, you need to check is there in this array an owner ID

    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    const isLiked = likes.some((like) => like === currentUser._id);

    !isLiked && isLoggedIn
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log("hello");
    const token = localStorage.getItem("jwt");

    if (token) {
      // console.log("bye");
      auth
        .verifyUser(token)

        .then((data) => {
          // console.log("setCurrentUser");
          setCurrentUser(data);
          setIsLoggedIn(true);
          console.log(data); // Handle the user data
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
    // check localstorage for a token
    // if there
    // send the getCurrentUser req
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              userData={userData}
              handleAddRegistration={handleAddRegistration}
              handleShowLogin={handleShowLogin}
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
                    handleCardLike={handleCardLike}
                    handleDeleteClick={handleDeleteItem}
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
                      handleSignOut={handleSignOut}
                      handleEditModal={handleEditModal}
                      handleCardLike={handleCardLike}
                      // handleDeleteClick={handleDeleteItem}
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
                    <Navigate to="/login" replace />
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
              userData={userData}
              /* handleDeleteItem={handleDeleteItem} */
            />
          )}
          {/*<RegisterModal handleUserRegister...*/}
          <Footer />
          <RegisterModal
            isOpen={activeModal === "registration-modal"}
            onClose={closeActiveModal}
            onSubmit={handleRegistration}
            handleShowLogin={handleShowLogin}
          />
          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={closeActiveModal}
            onSubmit={handleLogin}
            handleAddRegistration={handleAddRegistration}
          />
          <EditProfileModal
            activeModal={EditProfileModal}
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            handleAddItem={handleAddItem}
            onEditProfileSubmit={handleEditProfileSubmit}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
