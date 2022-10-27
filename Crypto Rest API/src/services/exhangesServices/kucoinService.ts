import kucoinRequests from '../requests/requestDataFromKucoin';
import {createCodesStering} from '../createCurrenciesString';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyDataModel } from '../../models/CurrencyDataModel';
import { CurrencyModel } from '../../models/CurrencyModel';

class KukoinService
{
    async getPriceInfoAsync(currencies:CurrencyModel[]):Promise<CurrencyDataModel[]>
    {
        const codesString = createCodesStering(currencies);
        const kucoinData = await kucoinRequests.requestData(codesString);
        const result=<CurrencyDataModel[]>[];
        for(let i = 0;i<currencies.length;i++ )
        {
            let price = kucoinData[currencies[i].CurrencyCode];
            if(currencies[i].Id =="iota")
            {
                const iotaData = await kucoinRequests.requestData("IOTA");
                price = iotaData['IOTA'];
            }
            const priceDataModel = 
            {
                Id:uuidv4(),
                CurrencyId:currencies[i].Id,
                Price:price,
                UnixTime:Date.now(),
                MarketName:"Kucoin"
            };
            result.push(priceDataModel);
        }
        return result;
    }
}
const kucoinService = new KukoinService();
export default kucoinService;