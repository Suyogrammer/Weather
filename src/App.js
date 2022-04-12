import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});

  const [city, setCity] = useState("");
  // const [currentLocation, setCurrentLocation] = useState([]);

  const searchCity = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93eee144b7450e33ce666ddbb913584a`
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
      setCity(" ");
    }
  };

  function degree(temp) {
    const result = (temp - 273.15) * 1.8 + 32;
    return result.toFixed(2);
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Weather</h1>
      </div>
      <div className="search">
        <input
          className="search-box"
          type="text"
          value={city}
          placeholder="Enter City"
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={searchCity}
        />
      </div>
      <div className="city">
        <h1>{data.name}</h1>
        <p>
          {data.weather ? (
            <b>
              {data.weather[0].main}
              <br />
            </b>
          ) : null}
        </p>
      </div>

      <div className="temp desc">
        {data.main ? <h1>{degree(data.main.temp)} °F</h1> : null}
      </div>
      <div className="temp-description">
        <p className="desc">
          {data.main ? (
            <b>
              {degree(data.main.feels_like)} °F
              <br /> Feels like
            </b>
          ) : null}
        </p>
        <p className="desc">
          {data.wind ? (
            <b>
              {data.wind.speed} mph <br /> Wind speed
            </b>
          ) : null}
        </p>
        <p className="desc">
          {data.main ? (
            <b>
              {data.main.humidity} <br /> Humidity{" "}
            </b>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default App;
