import {UserJsonData} from '../models/UserJsonDataModel';
import database from "../database/mongoDbClient";
import { ApiError } from '../exeptions/ApiError';

export class JsonStorageService
{
    async addUserDataToDbAsync(userData:UserJsonData)
    {
        try
        {
            var data = await database.findUserDataByUrlAsync(userData.userUrl);
            if(data)
            {
                throw ApiError.BadRequest("Data with the same url is already exists!");
            }
            await database.addUserDataToDbAsync(userData);
            return;
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async getUserDataFromDbAsync(url:string)
    {
        var data = await database.findUserDataByUrlAsync(url);
        if(!data)
        {
            throw ApiError.NotFound();
        }
        return data.jsonData;
    }
}

const jsonStorageService = new JsonStorageService();
export default jsonStorageService;