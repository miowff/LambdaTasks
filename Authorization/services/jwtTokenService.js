import jwt from 'jsonwebtoken';
import {SECRET,RFRESH_SECRET} from '../constants.js';

class JwtTokensService
{
    generateTokens(userId,userEmail)
    {
        var jwtToken = jwt.sign({userId:userId,email:userEmail},SECRET,{expiresIn:Math.floor(Math.random() * (60 - 30) + 30)});
        var refreshToken = jwt.sign({userid:userId,email:userEmail},RFRESH_SECRET,{expiresIn:'30d'});
        return{ accessToken:jwtToken, refreshToken:refreshToken };
    }

    validateAccessToken(token)
    {
        try
        {
            const payloadData = jwt.verify(token,SECRET);
            return payloadData;
        }
        catch(err)
        {
            return null;
        }
    }
    validateRefreshToken(token)
    {
        try
        {
            const payloadData = jwt.verify(token,RFRESH_SECRET);
            return payloadData;
        }
        catch(err)
        {
            return null;
        }
    }
}

const jwtTokenService = new JwtTokensService();
export default jwtTokenService;