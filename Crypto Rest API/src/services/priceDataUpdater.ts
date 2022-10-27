import currenciesRepository from "../database/repositories/currenciesRepository";
import priceDataRepository from "../database/repositories/priceDataRepository";
import coinbaseService from "./exhangesServices/coinbaseService";
import coinpapricaService from "./exhangesServices/coinpapricaService";
import kucoinService from "./exhangesServices/kucoinService";
import coinStatsService from "./exhangesServices/coinStatsService";
import coinMarketCapService from "./exhangesServices/coinMarketCapService";
import { CurrencyDataModel } from "../models/CurrencyDataModel";

export async function updatePricesAsync()
{
    const currencies = await currenciesRepository.getAllAsync();
    let pricesData:CurrencyDataModel[] = await coinbaseService.getPriceInfoAsync(currencies);
    pricesData = pricesData.concat(await coinpapricaService.getPriceInfoAsync(currencies));
    pricesData = pricesData.concat(await kucoinService.getPriceInfoAsync(currencies));
    pricesData = pricesData.concat(await coinStatsService.getPriceInfoAsync(currencies));
    pricesData = pricesData.concat(await coinMarketCapService.getPriceInfoAsync(currencies));

    await priceDataRepository.addManyAsync(pricesData);
}