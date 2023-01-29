import coinMarketCapRequests from "../requests/requestDataFromCoinmarketcap";
import { createCodesStering } from "../createCurrenciesString";
import { CurrencyModel } from "../../models/CurrencyModel";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class CoinMarketCapService {
  async getPriceInfoAsync(
    date: Date,
    unixTime: number,
    currencies: CurrencyModel[]
  ): Promise<CurrenciesPriceData> {
    const codesString = createCodesStering(currencies);
    const data = await coinMarketCapRequests.requestDataAsync(codesString);
    const result = new CurrenciesPriceData(date, unixTime, "CoinMarketCap");

    for (let i = 0; i < currencies.length; i++) {
      const price = data[currencies[i].CurrencyCode][0].quote.USD.price;
      const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
      result[key] = price;
    }
    return result;
  }
}

const coinMarketCapService = new CoinMarketCapService();
export default coinMarketCapService;
