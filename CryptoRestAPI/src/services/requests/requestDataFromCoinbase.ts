import axios from "axios";


class CoinbaseRequests
{
    async requestDataAsync(currencyTag:string)
    {
        try
        {
            const responce = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${currencyTag}`);
            return responce.data;
        }
        catch(err)
        {
            console.log(err);
        }
    }

}
 const coinbaseRequests = new CoinbaseRequests();
 export default coinbaseRequests; 