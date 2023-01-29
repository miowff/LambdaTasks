import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ;
export const SECRET = process.env.SECRET;
export const RFRESH_SECRET = process.env.RFRESH_SECRET;
export const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;
