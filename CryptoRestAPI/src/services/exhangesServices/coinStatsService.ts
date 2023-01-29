import coinStatsRequests from "../requests/requestDataFromCoinStats";
import { CurrencyModel } from "../../models/CurrencyModel";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class CoinStatsService {
  async getPriceInfoAsync(
    date: Date,
    unixTime: number,
    currencies: CurrencyModel[]
  ): Promise<CurrenciesPriceData> {
    const coinStatsData = await coinStatsRequests.requestDataAsync();
    const result = new CurrenciesPriceData(date, unixTime, "Coinstats");
    for (let i = 0; i < currencies.length; i++) {
      let currencyData = coinStatsData.find(
        (value: { symbol: string }) =>
          value.symbol == currencies[i].CurrencyCode
      );
      if (!currencyData) {
        const dataByCoinId = await coinStatsRequests.requestDataByIdAsync(
          currencies[i].Id
        );
        currencyData = dataByCoinId["coin"];
      }
      const price = currencyData["price"];

      const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
      result[key] = price;
    }
    return result;
  }
}
const coinStatsService = new CoinStatsService();
export default coinStatsService;
