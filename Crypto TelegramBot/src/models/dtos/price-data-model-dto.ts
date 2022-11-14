import { PriceDataDetails } from "./price-data-details-dto";

export class PriceDataModel
{
    CurrencyId:string;
    CurrencyCode:string;
    Price:string;
    PriceDataDetails?:PriceDataDetails
    constructor(CurrencyId:string,CurrencyCode:string,Price:string,priceDataDetails?:PriceDataDetails)
    {
        this.CurrencyCode=CurrencyCode,
        this.CurrencyId = CurrencyId,
        this.Price = Price
        this.PriceDataDetails = priceDataDetails
    }

    public toString():string
    {
        let priceDataString = `${this.CurrencyCode} - ${this.CurrencyId}
        \nСредняя цена за 15 минут: - ${this.Price}`;
        if(this.PriceDataDetails)
        {
            priceDataString+= this.PriceDataDetails.toString();
        }
        return priceDataString;
    }
}