import {UserModel} from '../Models/UserModel.js';
import usersService from '../services/usersService.js';
import {validationResult} from 'express-validator';
import {ApiError} from '../exeptions/apiError.js';

class AuthorizationController
{
    async signUp(req,res,next)
    {
        try
        {
          var validationErorrs = validationResult(req);
          if(!validationErorrs.isEmpty())
          {
            return next(ApiError.BadRequest('Validation error',validationErorrs.array())); 
          }
          var user = new UserModel(req.body.email,req.body.password);
          var result = await usersService.registerUser(user);
          res.json(result);
        }
        catch(err)
        {
            next(err);
        }
    }

    async login(req,res,next)
    {
        try
        {
            var userLoginModel = new UserModel(req.query.email,req.query.password);
            var result = await usersService.loginUser(userLoginModel);
            res.json(result);    
        }
        catch(err)
        {
            next(err);  
        }
    }

    async refresh(req,res,next)
    {
        try
        {
            var result = await usersService.refresh(req.refreshToken);
            res.json(result);
        }
        catch(err)
        {
            next(err);
        }
    }

    async getMe(req,res,next)
    {
        try
        {
            var userData = usersService.me(req.token);
            res.json(userData);
        }
        catch(err)
        {
            next(err);
        }
    }
}
const authorizationController = new AuthorizationController();
export default authorizationController;