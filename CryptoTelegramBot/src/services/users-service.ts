import { UserModel } from '../models/user-model';
import usersRepository from '../database/repositories/users-repository';

class UsersService {
  async addNewUser(userModel: UserModel) {
    const existingUser = await usersRepository.getById(userModel.Id);
    if (existingUser) {
      return;
    }
    return await usersRepository.addNewAsync(userModel);
  }
  async getUserById(id: number) {
    const user: UserModel = await usersRepository.getById(id);
    return user;
  }
}
const usersService = new UsersService();
export default usersService;
