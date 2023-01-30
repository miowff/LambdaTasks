import axios from 'axios';
import constants from '../constants';

export async function getCurrencyPrice(currencyCode: string, hours: number) {
  const requestUrl =
    constants.CRYPTO_API_URL + `?currency=${currencyCode}&hours=${hours}`;
  const responce = await axios.get(requestUrl);
  console.log(responce);
  const price = responce.data.Price as number;
  return price.toFixed(3);
}
