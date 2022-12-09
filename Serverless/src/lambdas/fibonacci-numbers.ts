import {  APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export const handler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => 
{
    let firstNumber = 0;
    let secondNumber = 1;
    let next;

    let result = [];
    
    for (let i = 1; i <= 10; i++) 
    {
        result.push(firstNumber);
        next = firstNumber + secondNumber;
        firstNumber = secondNumber;
        secondNumber = next;
    }
    const response = 
    {   
        statusCode: 200,
        body:'First 10 fibonacci numbers:' + JSON.stringify(result),
    };
    return {statusCode: 200,body: `Hello ${JSON.stringify(response)}`}
            
}