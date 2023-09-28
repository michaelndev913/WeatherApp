import axios from "axios";
import { apiKey } from "../constant";

export interface EndPointType {
    cityName: string;
    days?: string;
}

const forecastEndpoint = (params: EndPointType) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;
const locationsEndpoint = (params: EndPointType) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;
const apiCall = async (endpoint: string)=>{
    const options = {
        method: 'GET',
        url: endpoint,
    };

      try{
        const response = await axios.request(options);
        return response.data;
      }catch(error){
        console.log('error: ',error);
        return {};
    }
}

export const getWeatherForecast = (params: EndPointType) =>{
    let forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl);
}

export const getLocations = (params: EndPointType) =>{
    let locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl);
}
