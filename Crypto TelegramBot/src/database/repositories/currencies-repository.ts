
import { CurrencyModel } from "../../models/currency-model";
import db from "../databse";
import { BaseRepository } from "./base-repository";

class CurrenciesRepository extends BaseRepository<CurrencyModel>
{
    
}

const currenciesRepository = new CurrenciesRepository("currencies",db)
export default currenciesRepository;