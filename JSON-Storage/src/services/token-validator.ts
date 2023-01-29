import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../constants";

export function tokenValidator(token:string):JwtPayload
{
    let decodedToken= jwt.verify(token,JWT_SECRET) as JwtPayload;
    if(!decodedToken.hasOwnProperty('userEmail'))
    {
        throw new Error("Incorrect token payload");
    }
    return decodedToken;
}