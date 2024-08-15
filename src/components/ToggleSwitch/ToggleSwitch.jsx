import "./ToggleSwitch.css";
import React from "react";
import { useContext, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  //const [currentTemperatureUnit, handleToggleSwitchChange] = useState("F");

  //   const handleChange = (e) => {
  //     if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //     if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  //   };
  //console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit);
  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      >
        {" "}
      </span>
      <p
        className={`switch-temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch-temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
