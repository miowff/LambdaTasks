import { PRICE_RATES, MIMETYPE } from "../constants.js";

export function countPrice(requestData) {
  const langRates = PRICE_RATES[requestData.language.toLowerCase()];
  let price = requestData.count * langRates.oneSignPrice;
  if (price < langRates.minPrice) {
    price = langRates.minPrice;
  }
  if (requestData.mimetype === MIMETYPE.OTHER) {
    return price * 1.2;
  }
  return price;
}