import passwordService from "./passwordService.js";
import database from "../database/mongoDbClient.js";
import { RegistrationResponceModel } from "../models/RegisterResponceModel.js";
import jwtTokenService from "./jwtTokenService.js";
import { ApiError } from "../exeptions/apiError.js";

class UsersService {
  async registerUser(userModel) {
    const existingUser = await database.findUserByEmail(userModel.userEmail);
    if (existingUser != null) {
      throw ApiError.BadRequest("User with same email is already exists!");
    }
    const passwordHash = await passwordService.hashPasword(userModel.password);
    const result = await database.addUserToDb(userModel.userEmail, passwordHash);
    return new RegistrationResponceModel(
      `User succwfully added ${JSON.stringify(result)}`,
      true
    );
  }
  async loginUser(userModel) {
    const existingUser = await database.findUserByEmail(userModel.userEmail);
    if (existingUser === null) {
      throw ApiError.BadRequest("User not found!");
    }
    const isPasswordsMatch = await passwordService.validatePassword(
      userModel.password,
      existingUser.passwordHash
    );
    if (isPasswordsMatch == false) {
      throw ApiError.BadRequest("Wrong pass");
    }
    const tokens = await jwtTokenService.generateTokens(
      existingUser._id,
      existingUser.email
    );
    await database.saveToken(existingUser._id, tokens.refreshToken);
    await database.dbClientClose();
    return tokens;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError("Refresh token not given");
    }
    const payloadData = jwtTokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await database.findToken(refreshToken);
    if(!tokenFromDb)
    {
      throw ApiError.UnauthorizedError("Incorrect refresh token");
    }
    if (!payloadData) {
      throw ApiError.UnauthorizedError("Failed refresh token validation");
    }


    const user = await database.findUserByEmail(payloadData.email);
    const tokens = jwtTokenService.generateTokens(user._id, user.email);
    await database.saveToken(user._id, tokens.refreshToken);
    await database.dbClientClose();
    return tokens;
  }

  me(accessToken) {
    if (!accessToken) {
      throw ApiError.UnauthorizedError("Acess token not given");
    }
    const payloadData = jwtTokenService.validateAccessToken(accessToken);
    if (!payloadData) {
      throw ApiError.UnauthorizedError("Invalid acess token");
    }
    return { yourEmail: payloadData.email, yourId: payloadData.userId };
  }
}

const usersService = new UsersService();
export default usersService;
