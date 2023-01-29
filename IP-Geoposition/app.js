import {readCsvFile} from './fileReader.js';
import {parseCsvData} from './csvParser.js';
import { binarySearch } from './binarySearch.js';
import {ipToInt} from './ipToInt.js';
import express from 'express';
import {ResultModel} from './Models/resultModel.js';
import {CSV_FILE_PATH,PORT} from './constants.js';

const app = express();

var fileData = await readCsvFile(CSV_FILE_PATH);
const IP_RANGES = parseCsvData(fileData);

app.get('/getIpData',function(request,responce)
{
    try
    {
        var ip = request.headers['x-forwarded-for'];
        var intIp = ipToInt(ip);
        var resultRange = binarySearch(IP_RANGES,intIp);
        var result = new ResultModel(ip,resultRange.countryName);
        responce.send(JSON.stringify(result));
    }
    catch(err)
    {
        console.log(err);
    }
})

app.listen(PORT,()=>
{
    console.log(`Server has been started on port ${PORT}...`);
})







