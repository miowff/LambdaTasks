import axios from "axios";
import {GeocodingResponce} from "../Models/Weahter/geocodingResponce.js";
import{OPENWEATHER_API_KEY} from '../tokens.js'; //My open weater api key is not included to repository use youe own
import {createResultMessage} from './createResultMesasge.js';

const getGeopositionOfCity = async (cityName) => 
{
    const GET_CITY_GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    try 
    {
        var responce = await axios.get(GET_CITY_GEO_URL);
        return new GeocodingResponce(cityName,responce.data[0].lat,responce.data[0].lon);
    } 
    catch (err) 
    {
        if(err)
        {
            throw err;
        };
    }
}

const getCurrentForecast = async (geodata) =>
{
    const GET_CURRENT_FOREACAST_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${geodata.Lat}&lon=${geodata.Lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    try
    {
        var responce = await axios.get(GET_CURRENT_FOREACAST_URL);
        return responce.data;
    }
    catch (err) 
    {
       if(err)
       {
            throw err;
       };
    }
}

const getForecast = async (geodata) =>
{
    const GET_FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${geodata.Lat}&lon=${geodata.Lon}&units=metric&lang=ru&appid=${OPENWEATHER_API_KEY}`;
    try 
    {
        var responce = await axios.get(GET_FORECAST_URL);
        return responce.data.list;
    } 
    catch (err) 
    {
        if(err)
        {
            throw err;
        };
    }
}

export async function getCurrentWindData(cityName)
{
   try
   {
        var geodata = await getGeopositionOfCity(cityName);
        var currentWeatherData = await getCurrentForecast(geodata);
        var result = `Cкорость ветра в ${cityName}: ` + currentWeatherData.wind.speed + "м/с";
        return result;
   }
   catch(err)
   {
        return "Такого города не существует! Вы можете изменить город в настрйоках.";  
   }
}

export async function forecastForThreeHoursAsync(cityName)
{
    try
    {
        var geodata = await getGeopositionOfCity(cityName);
        var weatherData = await getForecast(geodata);
        var result = createResultMessage(weatherData,cityName);
        return result;
    }
    catch(err)
    {  
        return "Такого города не существует! Вы можете изменить город в настрйоках.";
    }
}

export async function forecastForSixHoursAsync(cityName)
{
    try
    {
        var geodata = await getGeopositionOfCity(cityName);
        var weatherData = await getForecast(geodata);
        var weatherDataForSixHours = [];
        for(let i = 0; i < weatherData.length; i++)
        {
            var date = new Date(weatherData[i].dt * 1000);
            let hours = date.getUTCHours();
            if(hours%6==0)
            {
               weatherDataForSixHours.push(weatherData[i]);
            }
        }
        return createResultMessage(weatherDataForSixHours,cityName);
    }
    catch(err)
    {
        return "Такого города не существует! Вы можете изменить город в настрйоках.";
    }
}

