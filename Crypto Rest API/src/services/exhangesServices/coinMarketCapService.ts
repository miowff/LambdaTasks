import coinMarketCapRequests from '../requests/requestDataFromCoinmarketcap';
import {createCodesStering} from '../createCurrenciesString';
import { v4 as uuidv4 } from 'uuid';
import {CurrencyDataModel} from '../../models/CurrencyDataModel';
import { CurrencyModel } from '../../models/CurrencyModel';

class CoinMarketCapService
{
    async getPriceInfoAsync(currencies:CurrencyModel[]):Promise<CurrencyDataModel[]>
    {
        const codesString = createCodesStering(currencies);
        const data = await coinMarketCapRequests.requestDataAsync(codesString);
        const result=<CurrencyDataModel[]>[];
        const unixTime = Date.now();
        for(let i = 0;i<currencies.length;i++)
        {
            const price = data[currencies[i].CurrencyCode][0].quote.USD.price;
            const priceDataModel = 
            {   
                Id:uuidv4(),
                CurrencyId:currencies[i].Id,
                Price:price,
                UnixTime:unixTime,
                MarketName:"CoinMarketCap",
                DateTime:new Date()
            };
            result.push(priceDataModel);
        }
        return result;
    }
}

const coinMarketCapService = new CoinMarketCapService();
export default coinMarketCapService;