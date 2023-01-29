import { MarketModel } from "src/models/market-model";
import database from "../database-connection";
import { BaseRepository } from "./base-rerpository";

class MarketsRespository extends BaseRepository<MarketModel> {}

const marketsRepository = new MarketsRespository("Markets", database);
export default marketsRepository;
