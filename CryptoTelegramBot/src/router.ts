import Router from 'express';
import telegramRequestsController from './controllers/telegram-requests-controller';
import constants from './constants';

const defaultRouter = Router();

defaultRouter.post(constants.REQUEST_URL,telegramRequestsController.handleRequest);

export default defaultRouter;