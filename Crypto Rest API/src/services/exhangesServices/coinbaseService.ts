import { CurrencyDataModel } from "../../models/CurrencyDataModel";
import coinbaseRequests from "../requests/requestDataFromCoinbase";
import { v4 as uuidv4 } from 'uuid';
import { CurrencyModel } from "../../models/CurrencyModel";

class CoinbaseService
{
    async getPriceInfoAsync(currencies:CurrencyModel[]):Promise<CurrencyDataModel[]>
    {
        const usdExchange = await coinbaseRequests.requestDataAsync("USD");
        const result=<CurrencyDataModel[]>[];
        const unixTime = Date.now();
        for(let i = 0;i<currencies.length;i++)
        {
            let price = 1 / +usdExchange.data.rates[currencies[i].CurrencyCode];
            if(Number.isNaN(price))
            {
                const currencyData = await coinbaseRequests.requestDataAsync(currencies[i].CurrencyCode);
                price = currencyData.data.rates.USD;
            }
            const priceDataModel = 
            {
                Id:uuidv4(),
                CurrencyId:currencies[i].Id,
                Price:price,
                UnixTime:unixTime,
                MarketName:"Coinbase",
                DateTime:new Date()
            };
            result.push(priceDataModel);
        }
        return result;
    }
}

const coinbaseService = new CoinbaseService();
export default coinbaseService;

