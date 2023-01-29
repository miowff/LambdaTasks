import { CurrencyModel } from "../../models/currency-model";
import { UserModel } from "../../models/user-model";
import db from "../databse";
import { BaseRepository } from "./base-repository";

class UsersRepository extends BaseRepository<UserModel>
{
    async getFavouriteCurrenciesAsync(userId:number):Promise<CurrencyModel[]>
    {
        return new Promise((resolve)=>
        {
            db.all(`SELECT * FROM currencies JOIN userCurrency on currencies.id = CurrencyId where userId = ${userId}`,[],(err,rows)=>
            {
                if(err) {throw err}
                resolve(rows);
            });
        });
    }
    async removeCurrencyFromFavourites(currencyId:string,userId:number)
    {
        await db.run(`DELETE FROM userCurrency WHERE CurrencyId = '${currencyId}' AND UserId = ${userId}`);
    }
}

const usersRepository = new UsersRepository('users',db);
export default usersRepository;