/* eslint-disable @typescript-eslint/no-explicit-any */
import { CurrencyModel } from "../models/currency-model";
import { CallbackDataQuery } from "../models/dtos/callback-data-quey";

export function createInlineKeyboardForCurrencies(currencies:CurrencyModel[],rowLength:number)
{
    const result=[];
    for(let i = 0;i<currencies.length;i++)
    {
        const row =[];
        for(let j=0;j<rowLength && i<currencies.length;j++)
        {
            row.push(createInlineButton(currencies[i].CurrencyCode,JSON.stringify(new CallbackDataQuery('/Info',currencies[i].Id))));
            i++;
        }
        result.push(row);
    }
    return result;
}


function createInlineButton(text:string,callback_data:string)
{
    const inlineButton = 
    {
        text:text,
        callback_data:callback_data
    }
    return inlineButton;
}