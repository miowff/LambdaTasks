import axios from "axios";
import constants from "../../constants";
class CoinStatsRequests {
  async requestDataAsync() {
    try {
      const responce = await axios.get(
        constants.COINSTATS_URL as string
      );
      return responce.data.coins;
    } catch (err) {
      console.log(err);
    }
  }
  async requestDataByIdAsync(currencyId: string) {
    try {
      const responce = await axios.get(
        `https://api.coinstats.app/public/v1/coins/${currencyId}`
      );
      return responce.data;
    } catch (err) {
      console.log(err);
    }
  }
}
const coinStatsRequests = new CoinStatsRequests();
export default coinStatsRequests;
