import os from 'os';
import dateFormat from 'dateformat';

export function createResultMessage(weatherData,cityName)
{
    var result = cityName + os.EOL + convertUnixDataToDay(weatherData[0].dt)+ " " + "Сегодня" + os.EOL;
    for(var i = 0; i < weatherData.length; i++)
    {
       if(i - 1 > 0 &&
        convertUnixDataToDay(weatherData[i-1].dt) != convertUnixDataToDay(weatherData[i].dt))
       {
        result += convertUnixDataToDay(weatherData[i].dt)+ " " 
                + convertUnixDataToDayAndMounth(weatherData[i].dt) + os.EOL;
       }
       var weatherDescription = weatherData[i].weather[0].description;
       result += convertUnixDataToHours(weatherData[i].dt) + " "
                + "+" + weatherData[i].main.temp + "C "  + weatherDescription 
                + emojiForWeather(weatherDescription) + os.EOL;
    }
    return result;
}

function convertUnixDataToDay(unixTimeStamp)
{
    const dateObject = new Date(unixTimeStamp * 1000);
    return dateObject.toLocaleString("ru-RU",{weekday: "long"});
}

function convertUnixDataToDayAndMounth(unixTimeStamp)
{
    const dateObject = new Date(unixTimeStamp * 1000);
    return dateFormat(dateObject,"dd.mm");
}

function convertUnixDataToHours(unixTimeStamp)
{
    const dateObject = new Date(unixTimeStamp * 1000);
    return dateFormat(dateObject,"HH:MM");
}

function emojiForWeather(weatherDescription)
{
    switch(weatherDescription)
    {
        case 'ясно': return '☀️';
        case 'небольшая облачность': return '🌤';
        case 'облачно с прояснениями':return '🌥';
        case 'пасмурно': return '☁️';
        case 'небольшой дождь': return '🌦';
        case 'переменная облачность': return '🌤';
        case 'дождь': return '🌧';
        case 'туман': return '🌫';
        case 'снег': return '❄️';
        case 'гроза': return '⛈';
        default: return '';
    }
}