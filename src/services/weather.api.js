import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// lat, lon y fecha (timestamp)
export const getWeatherByCoords = async (lat, lon) => {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
      lang: "es",
    },
  });

  return res.data;
};