import { Request } from "src/models/request-model.ts";
import database from "../database-connection";
import { BaseRepository } from "./base-rerpository";

class RequestsRepository extends BaseRepository<Request>
{
    
}

const requestRepository = new RequestsRepository('Requests',database);
export default requestRepository;