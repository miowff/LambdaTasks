import path from 'path';
import fs from 'fs/promises';
import os from 'os';

const filePath = path.join('CurrencyExchangeModule/CurrentExchangeRate.txt');

export function writeExchangeRate(data)
{
    var currentDate = new Date();
    fs.writeFile(filePath,"Updated at: " + currentDate + os.EOL + data , (err)=>
    {
        if(err) throw err;
    });
}
async function readFile()
{
    try 
    {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        return data;
    } 
    catch (err) 
    {
        console.log(err);
    }
}
export async function getExchangeRate(currencyCode)
{
    var dataFromFile = await readFile();
    var result = "Курс " + currencyCode + os.EOL;
    dataFromFile.split(os.EOL).filter(item =>
    {
        if(item.includes(currencyCode))
        {
            result += item + os.EOL;
        }
    });
    return result;
}