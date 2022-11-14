import { UserModel } from "../../models/user-model";
import db from "../databse";
import { BaseRepository } from "./base-repository";

class UsersRepository extends BaseRepository<UserModel>
{
    
}

const usersRepository = new UsersRepository('users',db);
export default usersRepository;