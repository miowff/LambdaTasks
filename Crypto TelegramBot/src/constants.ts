import * as dotenv from 'dotenv';
dotenv.config();

class Constants
{
    PORT:string;
    NODE_ENV:string;
    HOST:string;
    HOST_URL:string;
    BOT_TOKEN:string;
    TELEGRAM_API_URL:string;
    SERVER_URL:string;
    WEBHOOK_URL:string;
    REQUEST_URL:string;
    CRYPTO_API_URL:string;
    constructor()
    { 
        this.PORT = process.env.PORT as string;
        this.HOST = process.env.HOST as string;
        this.NODE_ENV = process.env.NODE_ENV as string;
        this.HOST_URL = process.env.HOST_URL as string;
        this.BOT_TOKEN = process.env.BOT_TOKEN as string;
        this.TELEGRAM_API_URL = process.env.TELEGRAM_API_URL as string;
        this.SERVER_URL = process.env.SERVER_URL as string;
        this.WEBHOOK_URL = process.env.WEBHOOK_URL as string;
        this.REQUEST_URL = process.env.REQUEST_URL as string;
        this.CRYPTO_API_URL = process.env.CRYPTO_API_URL as string;
    }
}

const constants = new Constants();
export default constants;