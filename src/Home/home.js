import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";

const api = {
  key: "6c80be516ad36906e18afbacde716ae5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [cloudiness, setCloudiness] = useState(null);
  const [rain, setRain] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  
  // const query = location.state;
  const API_KEY = "6c80be516ad36906e18afbacde716ae5";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data, "helloresponse");
      setWeatherData(response.data);
      if (
        response.data &&
        response.data.list &&
        response.data.list.length > 0
      ) {
        setCloudiness(response.data.list[0].clouds.all);
        setHumidity(response.data.list[0].main.humidity);
        setWindSpeed(response.data.list[0].wind.speed);
        if (response.data.list[0].rain) {
          setRain(response.data.list[0].rain["3h"]);
        } else {
          setRain(null);
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchWeatherData();
    }
  }, [query]);

  const getDailyForecast = () => {
    if (weatherData && weatherData.list) {
      const dailyData = {};

      weatherData.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyData[date]) {
          dailyData[date] = {
            temperature: item.main.temp,
            weather: item.weather[0].description,
          };
        }
      });
      return dailyData;
    }
    return null;
  };
  useEffect(() => {
    getDailyForecast();
  });
  const dailyForecast = getDailyForecast();
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === 200) {
            navigate(`/weather/${query}`);
          } else {
            console.error("City not found");
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const redirectToAnotherPage = () => {
    navigate("/Weather", { state: query });
  };



  return (
    <>
      <div className="home_bg">
        <div className="cloud_flex">
          <img src="/cloud.webp" alt="" className="cloud" />
          <h1 className="heading">Weather Forecast</h1>
          <img src="/cloud.webp" alt="" className="cloud" />
        </div>

        <div
          className={
            typeof weather.main != "undefined"
              ? weather.main.temp > 16
                ? "app warm"
                : "app"
              : "app"
          }
        >
          <main>
            <div className="search-box">
              {console.log(query, "janki")}
              <div onClick={search} >
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Timezone Search"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  // onKeyPress={search}
                />
              </div>
              {/* <button className="home_submit" >Submit</button> */}
            </div>
            {typeof weather.main != "undefined" ? (
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main.temp)}°c</div>
                  <div className="weather">{weather.weather[0].main}</div>
                  <div>{weather.description}</div>
                  <div>{weather.sys.sunrise}</div>
                  <div>{weather.sys.sunset}</div>
                  <div>{weather.main.humidity}</div>
                </div>
              </div>
            ) : (
              ""
            )}
          </main>
        </div>

        {/* <div className="sun_img">
          <div className="sub_img_contain">
            <h3>86.8 °f</h3>
            <img src="/sun.png" alt="" className="sun" />
            <button>Sun</button>
          </div>
          <div className="sub_img_contain">
            <h3>86.8 °f</h3>
            <img src="/sun.png" alt="" className="sun" />
            <button>Mon</button>
          </div>
          <div className="sub_img_contain">
            <h3>86.8 °f</h3>
            <img src="/sun.png" alt="" className="sun" />
            <button>Tue</button>
          </div>
          <div className="sub_img_contain">
            <h3>86.8 °f</h3>
            <img src="/sun.png" alt="" className="sun" />
            <button>Wen</button>
          </div>
          <div className="sub_img_contain">
            <h3>86.8 °f</h3>
            <img src="/sun.png" alt="" className="sun" />
            <button>Thu</button>
          </div>
          <div className="sub_img_contain">
            <h3>86.8 °f</h3>
            <img src="/sun.png" alt="" className="sun" />
            <button>Fri</button>
          </div>
          <div className="sub_img_contain">
            <h3>86.8 °f</h3>
            <img src="/sun.png" alt="" className="sun" />
            <button>Sat</button>
          </div>
        </div> */}
        <div>
          {weatherData && (
            <div>
              <h2 className="weather_heading">Current Weather  {query}</h2>
            </div>
          )}
          
          <div className="sun_img">
            {dailyForecast &&
              Object.entries(dailyForecast).map(([date, data]) => (
                <div className="sub_img_contain">
                  <div key={date}>
                    <h2>{data.temperature}°C</h2>
                    <img src="/sun.png" alt="" className="sun" onClick={redirectToAnotherPage}  />
                    <h2>{date}</h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
