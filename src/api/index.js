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