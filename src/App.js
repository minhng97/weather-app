import React, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScreenCapture from './ScreenCapture'

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
  const [screenCapture, handleScreenCapture] = useState('')
  AOS.init()



  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log(result)

          setWeather(result)
          localStorage.setItem('query', query)
          setQuery('')
        })
    }
  }
  function weatherCss() {
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
            placeholder="search city..."
            autoComplete="on"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>

        {(typeof weather.main != "undefined") ? (
          <>

            <ScreenCapture onEndCapture={handleScreenCapture}>
              {({ onStartCapture }) => (
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
                  </div>

                  <div style={{ marginTop: "500px" }}>
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              style={{ color: "whitesmoke" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].icon} />
                Cloudiness: {weather.clouds.all} %
  
              </div>
              <div style={{ display: "flex" }}><p> Pressure: </p> <span> {weather.main.pressure} hpa</span></div>
              <div style={{ display: "flex" }}> <p> Humidity: </p> <span> {weather.main.humidity}</span></div>
              <div style={{ display: "flex" }}> <p> Visibility: </p> <span> {weather.visibility}</span></div>
              <div style={{ display: "flex" }}> <p> Wind: </p> <span> {weather.wind.speed}</span></div>
              <div style={{ display: "flex" }}> <p>Description: </p> {weather.weather[0].description} </div>

            </div></div>

                  <button style={{
                    padding: " 4px",
                    borderRadius: '6px',
                    outline: 'none',
                    border: 'none',
                    background: '#fff5ee99'
                  }} onClick={onStartCapture}>Capture</button>
                  <br />
                  <br />
                  <img src={screenCapture} alt="" />
                </>)}
            </ScreenCapture>
          </>)

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


        {(typeof weather.main != "undefined")
          ? ('')
          : (null)}



      </main>
    </div >
  );
}

export default App;
