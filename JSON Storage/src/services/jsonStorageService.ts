import {UserJsonData} from '../models/UserJsonDataModel';
import database from "../database/mongoDbClient";
import { ApiError } from '../exeptions/ApiError';
import { EphemeralKeyInfo } from 'tls';

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
    async deleteData(route:string,email:string)
    {
        let result = await database.delete(route,email);
        if(!result.hasOwnProperty('deletedCount') ||result.deletedCount == 0)
        {
            throw ApiError.NotFound();
        }
        return result;
    }
}

const jsonStorageService = new JsonStorageService();
export default jsonStorageService;