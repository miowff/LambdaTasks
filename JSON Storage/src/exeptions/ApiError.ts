export class ApiError extends Error
{
    public status:any;

    constructor(status:any,message:string)
    {
        super();
        this.status = status;
    }
    static NotFound()
    {
        return new ApiError(404,"Not found");
    }
    static BadRequest(message:string)
    {
        return new ApiError(400,message);
    }
}