import { useState } from "react";
/*import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";*/
import "./App.css";
import Header from "./Header/Header";
import Main from "../Main/Main.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main weatherData={weatherData} />
        </div>
      </div>
    </>
  );
}

export default App;
