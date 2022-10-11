import { ApiError } from '../exeptions/apiError.js';

export function handleError(error,req,res,next)
{
    if(error instanceof ApiError)
    {
        return res.status(error.status).json({message:error.message,errors:error.errors});
    }
    return res.status(500).json({message:`Unexpected error! ${error.message}`});
}