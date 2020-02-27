import React, { useState } from 'react';

import './App.css';

const api = {
  key: "b251a0105d1b7dd8c153acf7d43e6fc0",
  base: "https://api.openweathermap.org/data/2.5/"
}
const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

// localStorage.getItem('query') ? localStorage.getItem('query') : 
function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          localStorage.setItem('query', query)
          setQuery('')
          console.log(result)
        })
    }
  }
  function weatherCss()  {
    if (typeof weather.main != 'undefined') {
      if (weather.main.temp > 16) { return "app warm" }
      return "app"
    }
    return "app"
  }
  return (
    <div className={weatherCss()}>


      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="search"
            autoComplete="on"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>

        {(typeof weather.main != "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div></>
        )
          : (<>
            <div className="location-box">
              <div className="location">
                
            </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>

            <div className="weather-box">
              <div className="temp">
              °C
            </div>
              <div className="weather">
              
             
            </div>
            </div></>)}



      </main>
    </div>
  );
}

export default App;
