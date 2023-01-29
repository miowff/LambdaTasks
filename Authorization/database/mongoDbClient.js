import { MongoClient } from "mongodb";
import { MONGO_DB_CONNECTION_URL } from "../constants.js";

export class Database {
  mongoDbClient;
  database;
  users;
  tokens;
  constructor() {
    this.mongoDbClient = new MongoClient(MONGO_DB_CONNECTION_URL);
    this.database = this.mongoDbClient.db("AuthorizationDB");
    this.users = this.database.collection("Users");
    this.tokens = this.database.collection("Tokens");
  }
  async addUserToDb(userEmail, passwordHash) {
    await this.mongoDbClient.connect();
    const user = { email: userEmail, passwordHash: passwordHash };
    const result = await this.users.insertOne(user);
    return result;
  }
  async findUserByEmail(email) {
    await this.mongoDbClient.connect();
    const query = { email: email };
    const user = await this.users.findOne(query);
    return user;
  }
  async saveToken(userId, refreshToken) {
    await this.mongoDbClient.connect();
    return await this.tokens.updateOne(
      { userId: userId },
      { $set: { userId: userId, refreshToken: refreshToken } },
      { upsert: true }
    );
  }
  async findToken(refreshToken) {
    await this.mongoDbClient.connect();
    return await this.tokens.findOne({ refreshToken: refreshToken });
  }
  async dbClientClose() {
    await this.mongoDbClient.close();
  }
}

const database = new Database();
export default database;