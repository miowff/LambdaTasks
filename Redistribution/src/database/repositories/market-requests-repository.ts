import { MarketRequests } from "src/models/market-requests-model";
import database from "../database-connection";
import { BaseRepository } from "./base-rerpository";

class MarketRequestsRepository extends BaseRepository<MarketRequests>
{
    public override async getByIdAsync(id:string|number):Promise<MarketRequests>
    {
        if(typeof id === 'string')
        {
            const [rows] = await this.db.executeQueryAsync(`SELECT * FROM ${this.tableName} WHERE MarketId = '${id}'`);
            return rows[0];
        }
        const [rows] = await this.db.executeQueryAsync(`SELECT * FROM ${this.tableName} WHERE MarketId = ${id}`);
        return rows[0];
    }
    public async incrementRequestsCount(id:string)
    {
        await this.db.executeQueryAsync(`UPDATE ${this.tableName} SET RequestsCount = RequestsCount + 1 WHERE MarketId = '${id}'`);
    }
}

const marketRequestsRepository = new MarketRequestsRepository('MarketRequests',database);
export default marketRequestsRepository;