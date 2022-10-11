import express from 'express';
import { PORT } from './constants.js';
import bodyParser from 'body-parser';
import authRouter from './authorizationRouter.js';
import {handleError} from './middleware/errorMiddleware.js';

const app = express();
app.use(bodyParser.json());
app.use("/auth",authRouter);
app.use(handleError);

app.listen(PORT,()=>
{
    try
    {
        console.log(`Server has been started on port ${PORT}...`);
    }
    catch(error)
    {
        console.log(error.message);
    }
});
