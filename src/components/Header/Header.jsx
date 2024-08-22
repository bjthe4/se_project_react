import "./Header.css";
import headerLogo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <div>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        </div>

        <p className="Header__username">Benedict Iroha</p>
        <Link to="/profile" className="header__link">
          <img src={avatar} alt="Benedict Iroha" className="Header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
