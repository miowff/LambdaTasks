import Router from 'express';
import tokenController from './controllers/token-controller';

const tokenRouter = Router();

tokenRouter.get('/getToken',tokenController.createToken);

export default tokenRouter;