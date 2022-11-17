export class PriceDataDetails
{
    ThirtyMinutesData:string;
    OneHourData:string;
    ThreeHoursData:string;
    SixHousData:string;
    TwelveHoursData:string;
    OneDayData:string;

    constructor(ThirtyMinutesData:string,OneHourData:string,ThreeHoursData:string,SixHousData:string,
        TwelveHoursData:string,OneDayData:string)
    {
        this.ThirtyMinutesData = ThirtyMinutesData,
        this.OneHourData = OneHourData,
        this.ThreeHoursData = ThreeHoursData,
        this.SixHousData  = SixHousData,
        this.TwelveHoursData = TwelveHoursData,
        this.OneDayData = OneDayData
    }
    public toString():string
    {
        const priceDataString = `\nСредння цена за 30 минут:${this.ThirtyMinutesData}\nСредняя цена за 1 час:${this.OneHourData}\nСредння цена за 3 часа:${this.ThreeHoursData}\nСредняя цена за 6 часов:${this.SixHousData}\nСредняя цена за 12 часов:${this.TwelveHoursData}\nСредняя цена за 24 часа:${this.OneDayData}`
        return priceDataString
    }
}