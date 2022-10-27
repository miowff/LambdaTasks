import { CurrencyDataModel } from '../../models/CurrencyDataModel';
import {BaseRepository} from './baseRepository';
import database from '../databaseConnection';

class PriceDataRepository extends BaseRepository<CurrencyDataModel>
{
    async deleteLegacyData()
    {
        const date = Date.now()
        const dayInUnixFormat = 24*60*60*1000;
        await this.db.executeQueryAsync(
            `DELETE FROM ${this.tableName} WHERE (${date} - UnixTime) > ${dayInUnixFormat}`);
    }
    async getCurrencyPrice(currencyId:string,time:number)
    {
        const currentDate = Date.now();
        const [price] = await this.db.executeQueryAsync(
        `SELECT AVG(Price) FROM ${this.tableName} 
        WHERE (${currentDate} - UnixTime) < ${time} 
        AND CurrencyId = '${currencyId}'`);
        return price;
    }
    async getCurrencyPriceByMarket(currencyId:string,time:number,marketName:string)
    {
        const currentDate = Date.now();
        const [price] = await this.db.executeQueryAsync(
        `SELECT AVG(Price) FROM ${this.tableName} 
        WHERE (${currentDate} - UnixTime) < ${time} 
        AND CurrencyId = '${currencyId}' 
        AND MarketName = '${marketName}'`);
        return price;
    }
}
const priceDataRepository = new PriceDataRepository("pricedata",database);
export default priceDataRepository;