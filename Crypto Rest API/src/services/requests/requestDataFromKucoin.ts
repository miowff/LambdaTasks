import axios from "axios";

class KucoinRequests
{
    async requestData(currenciesTags:string)
    {
        const responce = await axios.get(`https://api.kucoin.com/api/v1/prices?currencies=${currenciesTags}`);
        return responce.data.data;
    }
}
const kucoinRequests = new KucoinRequests()
export default kucoinRequests;