import Router from 'express';
import jsonStorageController from './controllers/jsonStorageController';


const jsonDataRouter = Router();

jsonDataRouter.post('/:userRoute',jsonStorageController.addData);
jsonDataRouter.get('/:userRoute',jsonStorageController.getData);
jsonDataRouter.put('/:userRoute',jsonStorageController.updateData);

export default jsonDataRouter;