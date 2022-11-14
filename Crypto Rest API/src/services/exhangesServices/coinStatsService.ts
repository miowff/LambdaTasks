import coinStatsRequests from '../requests/requestDataFromCoinStats';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyDataModel } from '../../models/CurrencyDataModel';
import { CurrencyModel } from '../../models/CurrencyModel';

class CoinStatsService
{
    async getPriceInfoAsync(currencies:CurrencyModel[]):Promise<CurrencyDataModel[]>
    {
        const coinStatsData = await coinStatsRequests.requestDataAsync();
        const result=<CurrencyDataModel[]>[];
        const unixTime = Date.now();
        for(let i = 0;i<currencies.length;i++)
        {
            let currencyData = coinStatsData.find((value: { symbol: string; })=>value.symbol == currencies[i].CurrencyCode);
            if(!currencyData)
            {
                const dataByCoinId = await coinStatsRequests.requestDataByIdAsync(currencies[i].Id);
                currencyData = dataByCoinId['coin'];
            }
            const price = currencyData['price'];
            const priceDataModel = 
            {   
                Id:uuidv4(),
                CurrencyId:currencies[i].Id,
                Price:price,
                UnixTime:unixTime,
                MarketName:"CoinStats",
                DateTime:new Date()
            };
            result.push(priceDataModel);
        }
        return result;
    }
}
const coinStatsService = new CoinStatsService();
export default coinStatsService;