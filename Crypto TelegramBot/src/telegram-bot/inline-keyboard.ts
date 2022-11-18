/* eslint-disable @typescript-eslint/no-explicit-any */
import { CurrencyModel } from "../models/currency-model";
import { CallbackDataQuery } from "../models/dtos/callback-data-quey";

class InlineKeyboardService
{
    public returnRoute = '/BackToMenu';

    createInlineKeyboard(currencies:CurrencyModel[],rowLength:number)
    {
        const result=[];
        for(let i = 0;i<currencies.length;i++)
        {
            const row =[];
            for(let j=0;j<rowLength && i<currencies.length;j++)
            {
                row.push(this.createInlineButton(currencies[i].CurrencyCode,JSON.stringify(new CallbackDataQuery('/Info',currencies[i].Id))));
                i++;
            }
        result.push(row);
        }
        return result;
    }
    currencyInlineKeyboard(currency:CurrencyModel,isInFavourites:boolean)
    {
        return [[{text:'Назад',callback_data:JSON.stringify(new CallbackDataQuery(this.returnRoute))},
        {text:'Детали',callback_data:JSON.stringify(new CallbackDataQuery('/Details',currency.Id))}],
        [isInFavourites?
        {text:'Убрать из избранного',callback_data:JSON.stringify(new CallbackDataQuery('/RemoveFavourite',currency.Id))}:
        {text:'В избранное',callback_data:JSON.stringify(new CallbackDataQuery('/AddToFavourite',currency.Id))}]]
    }

    createInlineButton(text:string,callback_data:string)
    {
        const inlineButton = 
        {
            text:text,
            callback_data:callback_data
        }
        return inlineButton;
    }

}

const inlineKeyboardService = new InlineKeyboardService();
export default inlineKeyboardService;
