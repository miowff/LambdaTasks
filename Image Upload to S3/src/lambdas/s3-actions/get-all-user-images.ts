import {  APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import jwt from 'jsonwebtoken';
import dynamoDBService from 'src/services/dynamoDB-service';
import { createUserImagesResult } from 'src/services/create-user-images-result';

export const handler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => 
{
    try
    {
        const decodedToken = jwt.decode(event.headers['Authorization'],{complete: true});
        const userEmail = decodedToken.payload.email;
        const imagesKeys = await dynamoDBService.findUserImageKeys(userEmail);
        const userImages = await createUserImagesResult(imagesKeys);
        return {statusCode: 200,body:'\n'+JSON.stringify(userImages)};
    }
    catch(err)
    {
        return {statusCode: 400,body: JSON.stringify(err)}
    }
}