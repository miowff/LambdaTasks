import express from 'express';
import { PORT } from './constants.js';
import bodyParser from 'body-parser';
import {countPrice} from './PriceCounterModule/countPriceFunction.js';
import {deadlineCounter} from './DeadlineCounterModule/countDeadlineFunction.js';
import { ResponceModel } from './models/responceModel.js';

const app = express();
app.use(bodyParser.json());

app.listen(PORT,()=>
{
    console.log(`Server has been started on port ${PORT}...`);
});

app.post('/getOrderDeadline',function(request,responce)
{
    try
    {
        var requestBody = request.body;
        if(requestBody.mimetype == 'none')
        {
            responce.statusMessage = "Incorrect mimetype";
            responce.status(400).end();
        }
        var price = countPrice(requestBody);
        var requestDate = new Date();
        var time = deadlineCounter(requestBody,requestDate);
        var responceModel = new ResponceModel(price,time.time,
                time.unixDeadline, time.stringDeadline);
        responce.json(responceModel);
    }
    catch(error)
    {
        console.log(error);
    }
});



