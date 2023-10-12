import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";
import { useLocation, useParams } from "react-router-dom";

const Weather = ({ match }) => {
  const location = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [cloudiness, setCloudiness] = useState(null);
  const [rain, setRain] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const query = location.state;
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

  return (
    <>
      <div className="weather_bg">
        <div className="weather_card_bg">
          {weatherData && (
            <div>
              <h2 className="weather_heading">Current Weather in {query}</h2>
            </div>
          )}
          <div className="weather_cloud_flex">
            <img src="/cloud.webp" alt="" className="weather_cloud" />
            <div>
              {cloudiness && <p>Clouds: {cloudiness}%</p>}
              {rain && <p>rain: {rain}%</p>}
              {humidity && <p>humidity: {humidity}%</p>}
              {windSpeed && <p>Wind Speed: {windSpeed} m/s</p>}
            </div>
          </div>
          <div className="temp_details_flex">
            {dailyForecast &&
              Object.entries(dailyForecast).map(([date, data]) => (
                <div className="sub_details_flex">
                  <div key={date}>
                    <h2>{date}</h2>
                    <img src="/sun.png" alt="" width={"30%"} />
                    <p>{data.temperature}°C</p>
                    {data.wind && <p>{data.wind} m/s</p>}
                    {/* <p> {data.clouds}</p> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
