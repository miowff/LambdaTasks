import { MongoClient } from "mongodb";
import {UserJsonData} from '../models/UserJsonDataModel';

export class Database
{
    private mongoDbClient:MongoClient;
    private database:any;
    private usersDataCollection:any;
    constructor()
    {
        this.mongoDbClient = new MongoClient('mongodb+srv://Mykola:<PASSWORD>@cluster0.8vibn79.mongodb.net/?retryWrites=true&w=majority');
        this.database = this.mongoDbClient.db("JsonStorageDb");
        this.usersDataCollection = this.database.collection("UsersJsonData");
    }

    async addUserDataToDbAsync(userData:UserJsonData)
    {
        try
        {
            var operatioResult = await this.usersDataCollection.insertOne(userData);
            return operatioResult;
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async findUserDataByUrlAsync(userUrl:string,userEmail:string)
    {
        var userData = await this.usersDataCollection.findOne({userUrl:userUrl,email:userEmail});
        return userData;
    }
    async update(userData:UserJsonData)
    {
        await this.usersDataCollection.updateOne(
            {userUrl:userData.userUrl,email:userData.email},
            {$set:{jsonData:userData.jsonData}});
    }
    async delete(route:string,email:string)
    {
      let result = await  this.usersDataCollection.deleteOne({userUrl:route,email:email});
      return result;
    }
} 

const database = new Database();
export default database;