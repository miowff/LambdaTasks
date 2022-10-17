import { MongoClient } from "mongodb";
import {UserJsonData} from '../models/UserJsonDataModel';
import { MONGODB_CONNECTION_URL } from "../constants";

export class Database
{
    private mongoDbClient:MongoClient;
    private database:any;
    private usersDataCollection:any;
    constructor()
    {
        this.mongoDbClient = new MongoClient(MONGODB_CONNECTION_URL);
        this.database = this.mongoDbClient.db("JsonStorageDb");
        this.usersDataCollection = this.database.collection("UsersJsonData");
    }

    async addUserDataToDbAsync(userData:UserJsonData)
    {
        try
        {
            await this.mongoDbClient.connect();
            var operatioResult = await this.usersDataCollection.insertOne(userData);
            await this.mongoDbClient.close();
            return operatioResult;
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async findUserDataByUrlAsync(userUrl:string)
    {
        try
        {
            await this.mongoDbClient.connect();
            var userData = await this.usersDataCollection.findOne({userUrl:userUrl});
            await this.mongoDbClient.close();
            return userData;
        }
        catch(err)
        {
            console.log(err);
        }
    }
} 

const database = new Database();
export default database;