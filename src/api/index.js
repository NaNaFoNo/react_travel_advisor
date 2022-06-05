import axios from 'axios';
import env from "react-dotenv";


export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              bl_longitude: sw.lng,
              tr_latitude: ne.lat,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
              'X-RapidAPI-Key': env.RAPID_KEY // env.RAPID_KEY
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
          params: { lon: lng, lat: lat},
          headers: {
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
            'X-RapidAPI-Key': env.WEATHER_KEY
          }
      });
      
      return data;
  } catch (error) {
      console.log(error);
  }
}