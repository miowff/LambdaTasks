import {  APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export const handler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => 
{
   const username = event.pathParameters.username;
   return {statusCode: 200,body: `Hello ${username}`}
}