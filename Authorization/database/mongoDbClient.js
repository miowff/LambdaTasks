import {MongoClient} from 'mongodb';
import {MONGO_DB_CONNECTION_URL} from '../constants.js';

const mongoDbClient = new MongoClient(MONGO_DB_CONNECTION_URL);
const database = mongoDbClient.db("AuthorizationDB");

var users = database.collection("Users");
var tokens = database.collection("Tokens");

export async function addUserToDb(userEmail,passwordHash)
{
  try 
  {
    await mongoDbClient.connect();
    var user = { email: userEmail, passwordHash:passwordHash};
    const result = await users.insertOne(user);
    return result;
  } 
  catch(err)
  {
    console.log(err.message);
  }
}

export async function findUserByEmail(email)
{
  try 
  {
    await mongoDbClient.connect();
    var query = { email: email};
    var user = await users.findOne(query);
    return user;
  } 
  catch(err)
  {
    console.log(err.message);
  }
}

export async function saveToken(userId,refreshToken)
{
  try
  {
    await mongoDbClient.connect();
    return await tokens.updateOne(
      {userId:userId},
      {$set:{userId:userId,refreshToken:refreshToken}},
      { upsert: true });
  }
  catch(err)
  {
    console.log(err.message);
  }
}
export async function findToken(refreshToken)
{
  try
  {
    await mongoDbClient.connect();
    return await tokens.findOne({refreshToken:refreshToken});  
  }
  catch(err)
  {
    console.log(err.message)
  }
}
export async function dbClientClose()
{
  try
  {
    await mongoDbClient.close();
  }
  catch(err)
  {
    console.log(err.message);
  }
}


 