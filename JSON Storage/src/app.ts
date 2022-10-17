import express,{Express,Request,Response} from 'express';
import {UserJsonData} from './models/UserJsonDataModel';
import bodyParser from 'body-parser';
import defaultRouter from './appRouter';
import {handleError} from './Middleware/errorsmiddleware';

const app:Express = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/defaultRoute',defaultRouter);
app.use(handleError);

app.listen(port,()=>
{
    console.log(`Server started on port ${port}`);
});
