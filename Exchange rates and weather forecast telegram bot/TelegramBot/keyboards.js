import { BUTTONS } from "./keyboardButtons.js";

export const KEYBOARDS = 
{
    home:[[BUTTONS.Home.weather],[BUTTONS.Home.currencyExchangeRates]],

    weather:[[BUTTONS.Weather.forecastForSixHours, BUTTONS.Weather.forecastForThreeHours],
    [BUTTONS.Weather.windData],[BUTTONS.Default.back],[BUTTONS.Settings.changeCity]],

    currencyExchangeRates:[[BUTTONS.CurrencyExchangeRates.EUR, BUTTONS.CurrencyExchangeRates.USD],
    [BUTTONS.Default.back]]
}