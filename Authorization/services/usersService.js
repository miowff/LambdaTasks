import passwordService from './passwordService.js';
import {saveToken,findToken,addUserToDb,findUserByEmail,dbClientClose} from '../database/mongoDbClient.js';
import {RegistrationResponceModel} from '../Models/RegisterResponceModel.js';
import jwtTokenService from './jwtTokenService.js';
import {ApiError} from '../exeptions/apiError.js';


class UsersService
{
    async registerUser(userModel)
    {
        var existingUser = await findUserByEmail(userModel.userEmail);
        if(existingUser != null)
        {
            throw ApiError.BadRequest("User with same email is already exists!");
        }
        var passwordHash = await passwordService.hashPasword(userModel.password);
        var result = await addUserToDb(userModel.userEmail,passwordHash);
        await dbClientClose();
        return new RegistrationResponceModel(`User succwfully added ${JSON.stringify(result)}`,true);
    }
    async loginUser(userModel)
    {
        var existingUser = await findUserByEmail(userModel.userEmail);
        if(existingUser === null)
        {
            throw ApiError.BadRequest("User not found!");
        }
        var isPasswordsMatch = await passwordService.validatePassword(userModel.password,existingUser.passwordHash);
        if(isPasswordsMatch == false)
        {
            throw ApiError.BadRequest("Wrong pass")
        }
        var tokens = await jwtTokenService.generateTokens(existingUser._id,existingUser.email);
        await saveToken(existingUser._id,tokens.refreshToken);
        await dbClientClose();
        return tokens;
    }

    async refresh(refreshToken)
    {
        if(!refreshToken)
        {
            throw ApiError.UnauthorizedError();
        }
        var payloadData = jwtTokenService.validateRefreshToken(refreshToken);
        var tokenFromDb = await findToken(refreshToken);
        if(!payloadData || !tokenFromDb)
        {
            throw ApiError.UnauthorizedError();
        }

        var user = await findUserByEmail(payloadData.email);
        var tokens = jwtTokenService.generateTokens(user._id,user.email);
        await saveToken(user._id,tokens.refreshToken);
        await dbClientClose();
        return tokens;
    }

    me(accessToken)
    {
        if(!accessToken)
        {
            throw ApiError.UnauthorizedError();
        }
        var payloadData = jwtTokenService.validateAccessToken(accessToken);
        if(!payloadData)
        {
            throw ApiError.UnauthorizedError();
        }
        return {yourEmail:payloadData.email, yourId: payloadData.userId};
    }
}

const usersService = new UsersService();
export default usersService;