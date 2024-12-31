import "./Header.css";
import headerLogo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { isLoggedIn } from "../App/App";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  userData,
  handleAddRegistration,
  handleShowLogin,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const myAvatar = userData?.avatar || userData?.name?.charAt(0);
  console.log(userData);

  const { avatar, email, name } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="Header logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="Header__user-container">
        <ToggleSwitch />
        {!isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__sign-up"
              onClick={handleAddRegistration}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="header__log-in"
              onClick={handleShowLogin}
            >
              Log In
            </button>
          </>
        ) : (
          <p>USERNAME</p>
        )}

        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        {/* will be needed for signout */}
        {/* <button
            type="button"
            className="header__sign-up"
            onClick={handleAddRegistration}
          >
            Sign Up
          </button>

          <button
            type="button"
            className="header__log-in"
            onClick={handleShowLogin}
          >
            Log In
          </button> */}

        <Link to="/profile" className="header__link">
          <p className="Header__username">Benedict Iroha</p>
          <img src={avatar} alt="avatar" className="Header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
