import React, { useEffect, useState } from 'react';

const WeatherFetcher = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const API_KEY = '13164d5a3307a8524af25cc2db6304a2'; // 🔑 Replace with your real API key

  useEffect(() => {
    // 🌍 Get user's coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          const mainWeather = data.weather[0].main; // e.g., Clear, Clouds, Rain
          const temp = data.main.temp;
          const cityName = data.name;
          
          setWeather({ main: mainWeather, temp, city: cityName });
          
          // 🧠 Save to localStorage for MoodRecommender to use
          localStorage.setItem("weather", mainWeather);
          localStorage.setItem("temperature", temp.toString());
          localStorage.setItem("city", cityName);
          
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch weather:', err);
          setLoading(false);
        });
    }
  }, [location]);

  // Optional: You can make this component invisible if you don't want to show weather
  // Just return null; instead of the JSX below
  
  return (
    <div className="mb-4 p-3 bg-gray-800 rounded-lg text-white text-sm">
      {loading ? (
        <p className="text-gray-400">🌤️ Fetching weather...</p>
      ) : weather ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {weather.main === 'Clear' ? '☀️' : 
               weather.main === 'Clouds' ? '☁️' : 
               weather.main === 'Rain' ? '🌧️' : 
               weather.main === 'Snow' ? '❄️' : '🌤️'}
            </span>
            <div>
              <p className="font-medium">{weather.city}</p>
              <p className="text-gray-300">
                {weather.main}, {Math.round(weather.temp)}°C
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-400">❌ Unable to fetch weather data</p>
      )}
    </div>
  );
};

export default WeatherFetcher;
