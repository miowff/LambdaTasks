import * as dotenv from "dotenv";
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT as string;
export const MONGO_DB_CONNECTION_STRING = process.env
  .MONGO_DB_CONNECTION_STRING as string;
