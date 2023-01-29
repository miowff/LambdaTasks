import axios from "axios";

class CoinpapricaRequests
{
    async requestDataAsync()
    {
        try
    {
        const responce = await axios.get(`https://api.coinpaprika.com/v1/tickers?quotes=USD`);
        return responce.data;
    }
    catch(err)
    {
        console.log(err);
    }
    }
}
const coinpapricaRequests = new CoinpapricaRequests();
export default coinpapricaRequests;