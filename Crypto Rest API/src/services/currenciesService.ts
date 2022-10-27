import currenciesRepository from "../database/repositories/currenciesRepository";
import { CurrencyModel } from "../models/CurrencyModel";

class CurrenciesService
{
    async getAllCurrencies():Promise<CurrencyModel[]>
    {
        const currencies = await currenciesRepository.getAllAsync();
        return currencies;
    }
}

const currenciesService = new CurrenciesService();
export default currenciesService;