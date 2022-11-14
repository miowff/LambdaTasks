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
        const priceDataString = `Средння цена за 15 минут:${this.ThirtyMinutesData}\n
        Средняя цена за 1 час:${this.OneHourData}\n
        Средння цена за 3 часа:${this.ThreeHoursData}\n
        Средняя цена за 6 часов:${this.SixHousData}\n
        Средняя цена за 12 часов:${this.TwelveHoursData}\n
        Средняя цена за 24 часа:${this.OneDayData}`
        return priceDataString
    }
}