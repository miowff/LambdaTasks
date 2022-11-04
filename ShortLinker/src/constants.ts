import * as dotenv from 'dotenv';
dotenv.config();

class Constants
{
    PORT:string;
    NODE_ENV:string;
    HOST:string;
    HOST_URL:string;
    DB_CONNECTION_STRING:string;
    DB_NAME:string;
    constructor()
    { 
        this.PORT = process.env.PORT as string;
        this.HOST = process.env.HOST as string;
        this.NODE_ENV = process.env.NODE_ENV as string;
        this.HOST_URL = process.env.HOST_URL as string;
        this.DB_CONNECTION_STRING = process.env.CONNECTION_URL as string;
        this.DB_NAME = process.env.DB_NAME as string;
    }
}

const constants = new Constants();
export default constants;
