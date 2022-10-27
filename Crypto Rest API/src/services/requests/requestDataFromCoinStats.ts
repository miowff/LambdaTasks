import axios from "axios";


class CoinStatsRequests
{
    async requestDataAsync() 
    {
        try
        {
            const responce = await axios.get(`https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD`);
            return responce.data.coins;
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async requestDataByIdAsync(currencyId:string)
    {
        try
        {
            const responce = await axios.get(`https://api.coinstats.app/public/v1/coins/${currencyId}`);
            return  responce.data;
        }
        catch(err)
        {
            console.log(err);
        }
    }
}
const coinStatsRequests = new CoinStatsRequests();
export default coinStatsRequests;