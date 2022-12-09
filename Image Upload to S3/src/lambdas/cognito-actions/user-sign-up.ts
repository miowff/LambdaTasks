import {  APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import cognitoServiceClient from 'src/services/cognito-service';


export const handler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => 
{
    const requestBody = JSON.parse(event.body);
    if(!requestBody)
    {
        return {statusCode:400,body:"Request body is empty!"};
    } 
    const userData = 
    {
        ClientId:process.env.COGNITO_CLIENT_ID,
        Username:requestBody['Username'],
        Password:requestBody['Password']
    }
    try
    {
        const responce = await cognitoServiceClient.signUp(userData);
        return {statusCode: 200,body: JSON.stringify(responce)}
    }
    catch(err)
    {
        return {statusCode: 400,body: JSON.stringify(err)};
    }
}