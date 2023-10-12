import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wea = ({ match }) => {
  const country = match.params.country;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=YOUR_API_KEY&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [country]);

  return (
    <div className='weather'>
      {/* Display weather data here */}
    </div>
  );
};

export default Wea;
