 import { ApiError } from '../exeptions/apiError.js';
 import jwtTokenService from '../services/jwtTokenService.js';

 export function checkAuthToken(req,res,next)
 {
    try
    {
        var authHeader = req.headers.authorization;
        if(!authHeader)
        {
            return next(ApiError.UnauthorizedError());
        }
        var accessToken = authHeader.split(' ')[1];
        if(!accessToken)
        {
            return next(ApiError.UnauthorizedError());
        }
        var tokenPayload = jwtTokenService.validateAccessToken(accessToken);
        if(!tokenPayload)
        {
            return next(ApiError.UnauthorizedError());
        }
        req.token = accessToken;
        next();
    }
    catch(err)
    {
        return next(ApiError.UnauthorizedError());
    }
 }

 export function checkRefreshToken(req,res,next)
 {
    try
    {
        var authHeader = req.headers.authorization;
        if(!authHeader)
        {
            return next(ApiError.UnauthorizedError());
        }
        var refreshToken = authHeader.split(' ')[1];
        if(!refreshToken)
        {
            return next(ApiError.UnauthorizedError());
        }
        var tokenPayload = jwtTokenService.validateAccessToken(accessToken);
        if(!tokenPayload)
        {
            return next(ApiError.UnauthorizedError());
        }
        req.refreshToken = refreshToken;
        next();
    }
    catch(err)
    {
        return next(ApiError.UnauthorizedError());
    }
 }
