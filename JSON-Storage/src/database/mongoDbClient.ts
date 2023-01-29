import { MongoClient } from "mongodb";
import { UserJsonData } from "../models/UserJsonDataModel";
import { MONGO_DB_CONNECTION_STRING } from "../constants";
import { ApiError } from "../exeptions/ApiError";

export class Database {
  private mongoDbClient: MongoClient;
  private database: any;
  private usersDataCollection: any;
  constructor() {
    this.mongoDbClient = new MongoClient(MONGO_DB_CONNECTION_STRING);
    this.database = this.mongoDbClient.db("JsonStorageDb");
    this.usersDataCollection = this.database.collection("UsersJsonData");
  }

  async addUserDataToDbAsync(userData: UserJsonData) {
    try {
      const operatioResult = await this.usersDataCollection.insertOne(userData);
      return operatioResult;
    } catch (err) {
      throw ApiError.DatabaseError(`Database error:${JSON.stringify(err)}`);
    }
  }

  async findUserDataByUrlAsync(userUrl: string, userEmail: string) {
    try {
      const userData = await this.usersDataCollection.findOne({
        userUrl: userUrl,
        email: userEmail,
      });
      return userData;
    } catch (err) {
      throw ApiError.DatabaseError(`Database error:${JSON.stringify(err)}`);
    }
  }
  async update(userData: UserJsonData) {
    try {
      await this.usersDataCollection.updateOne(
        { userUrl: userData.userUrl, email: userData.email },
        { $set: { jsonData: userData.jsonData } }
      );
    } catch (err) {
      throw ApiError.DatabaseError(`Database error:${JSON.stringify(err)}`);
    }
  }
  async delete(route: string, email: string) {
    try {
      const result = await this.usersDataCollection.deleteOne({
        userUrl: route,
        email: email,
      });
      return result;
    } catch (err) {
      throw ApiError.DatabaseError(`Database error:${JSON.stringify(err)}`);
    }
  }
}

const database = new Database();
export default database;
