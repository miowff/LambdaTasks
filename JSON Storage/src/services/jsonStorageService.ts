import {UserJsonData} from '../models/UserJsonDataModel';
import database from "../database/mongoDbClient";
import { ApiError } from '../exeptions/ApiError';

export class JsonStorageService
{
    async addUserDataToDbAsync(userData:UserJsonData)
    {
        var data = await database.findUserDataByUrlAsync(userData.userUrl,userData.email);
        if(data && data.email == userData.email)
        {
            throw ApiError.BadRequest("Data on the same route is already exist!");
        }
        await database.addUserDataToDbAsync(userData);
        return;
    }
    async getUserDataFromDbAsync(url:string,userEmail:string)
    {
        var data = await database.findUserDataByUrlAsync(url,userEmail);
        if(!data)
        {
            throw ApiError.NotFound();
        }
        return data.jsonData;
    }
    async updateDataAsync(userData:UserJsonData)
    {
        var data = await database.findUserDataByUrlAsync(userData.userUrl,userData.email);
        if(!data)
        {
            throw ApiError.NotFound();
        }
        await database.update(userData);
    }
}

const jsonStorageService = new JsonStorageService();
export default jsonStorageService;