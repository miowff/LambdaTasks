export class CallbackDataQuery
{
    action:string;
    currencyId:string|undefined;

    constructor(action:string,currencyId?:string|undefined)
    {
        this.action = action;
        this.currencyId = currencyId;
    }
}