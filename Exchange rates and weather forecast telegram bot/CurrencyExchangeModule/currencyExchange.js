import axios from "axios";
import os from 'os';
import {writeExchangeRate} from './interactExchangeRatesFile.js';

export async function updateCurrentExchangeRateFile()
{
    var monobankExchangeRate = await getMonobankExchangeRate();
    var privatbankExchangeRate = await getPrivatbankExchangeRate();

    var parsedMonobankExchange = parseMonobankResponce(monobankExchangeRate);
    var parsedPrivatbankExchange = parsePrivatbankResponce(privatbankExchangeRate);
    writeExchangeRate(parsedPrivatbankExchange + parsedMonobankExchange);

}
async function getMonobankExchangeRate()
{
    const MONOBANK_URL = 'https://api.monobank.ua/bank/currency';
    try
    {
        var monobankResponce = await axios.get(MONOBANK_URL);
        return monobankResponce.data;
    }
    catch (err)
    {
        console.error(err);
    }
}

async function getPrivatbankExchangeRate()
{
    const PRIVATBANK_URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
    try
    {
        var privatbankResponce = await axios.get(PRIVATBANK_URL);
        return privatbankResponce.data;
    }
    catch (err)
    {
        console.error(err);
    }
}

function parseMonobankResponce(monobankResponceData)
{
    var uanToUsdAndEurMono = monobankResponceData.filter(item =>
    {
        if(item.currencyCodeA == 840 || item.currencyCodeA == 978 && item.currencyCodeB == 980)
        {
            return item;
        }
    });
    var result = '';
    uanToUsdAndEurMono.forEach(element => 
    {
        result += convertCurrencyFromIsoToCode(element.currencyCodeA) + "Купить: " + element.rateBuy + ", "
                + "Продать: " + element.rateSell + " Monobank" + os.EOL;
    });
    return result;
}

function parsePrivatbankResponce(privatbankResponceData)
{
    var uanToUsdAndEurPrivat = privatbankResponceData.filter(item =>
    {
        if(item.ccy == 'USD' || item.ccy == 'EUR' && item.base_ccy == 'UAH')
        {
            return item;
        }
    });
    var result = '';
    uanToUsdAndEurPrivat.forEach(element=>
    {
        result += element.ccy + " " + "Купить: " + element.buy + ", " + "Продать: " + element.sale + " "
                + "PrivatBank" + os.EOL;
    });
    return result;
}

function convertCurrencyFromIsoToCode(iso)
{
    switch(iso)
    {
        case 840: return 'USD ';
        case 978: return 'EUR '; 
    }
}