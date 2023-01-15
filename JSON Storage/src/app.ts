import express,{Express,Request,Response} from 'express';
import bodyParser from 'body-parser';
import jsonDataRouter from './json-data-router';
import tokenRouter from './tokens-router';
import {handleError} from './Middleware/errors-middleware';

const app:Express = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/defaultRoute',jsonDataRouter);
app.use(tokenRouter);
app.use(handleError);

app.listen(port,()=>
{
    console.log(`Server started on port ${port}`);
});
