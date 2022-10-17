import Router from 'express';
import jsonStorageController from './controllers/jsonStorageController';

const defaultRouter = Router();

defaultRouter.post('/:userRoute',jsonStorageController.addData);
defaultRouter.get('/:userRoute',jsonStorageController.getData);

export default defaultRouter;