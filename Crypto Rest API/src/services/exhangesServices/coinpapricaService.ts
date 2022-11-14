import coinpapricaRequests from '../requests/requestDataFromCoinparica';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyDataModel } from '../../models/CurrencyDataModel';
import { CurrencyModel } from '../../models/CurrencyModel';

class CoinpapricaService
{
    async getPriceInfoAsync(currencies:CurrencyModel[]):Promise<CurrencyDataModel[]>
    {
        const coinpaprikaData = await coinpapricaRequests.requestDataAsync();
        const result = <CurrencyDataModel[]>[];
        const unixTime = Date.now();
        for(let i = 0;i<currencies.length;i++)
        {
            const currencyData = coinpaprikaData.find((value:{id:string})=>value.id==currencies[i].CoinPapricaId);
            const price = currencyData.quotes.USD.price;
            const priceDataModel = 
            {
                Id:uuidv4(),
                CurrencyId:currencies[i].Id,
                Price:price,
                UnixTime:unixTime,
                MarketName:"Coinpaprica",
                DateTime:new Date()
            };
            result.push(priceDataModel);
        }
        return result;
    }
}
const coinpapricaService = new CoinpapricaService();
export default coinpapricaService;