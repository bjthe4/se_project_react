import "./Header.css";
import headerLogo from "../../../assets/Logo.svg";
import avatar from "../../../assets/Avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Header logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="Header__user-container">
        <p className="Header__username">Benedict Iroha</p>
        <img src={avatar} alt="Benedict Iroha" className="Header__avatar" />
      </div>
    </header>
  );
}

export default Header;
