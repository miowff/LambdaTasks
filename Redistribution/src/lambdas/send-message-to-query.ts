import {APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import marketRequestsRepository from 'src/database/repositories/market-requests-repository';
import marketsRepository from 'src/database/repositories/markets-repository';
import { RequestData } from 'src/models/request-data-model';
import sqsService from 'src/services/sqs-service';

export const handler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => 
{
   try
   {
      const bodyData:RequestData = JSON.parse(event.body);
      const existigMarket = await marketsRepository.getByIdAsync(bodyData.MarketId);
      if(!existigMarket)
      {
         return {statusCode: 400,body: JSON.stringify(`There is no market with id: ${bodyData.MarketId}`)}; 
      }
      const marketRequests = await marketRequestsRepository.getByIdAsync(bodyData.MarketId);
      if(existigMarket.MaxRrequestsCount <= marketRequests.RequestsCount)
      {
         return {statusCode: 400,body: JSON.stringify(`Requests limit is over`)};
      }
      await marketRequestsRepository.incrementRequestsCount(bodyData.MarketId);
      await sqsService.sendMessageToQuery(bodyData);
      return {statusCode: 200,body: JSON.stringify(bodyData)};
   }
   catch(err)
   {
      return {statusCode: 400,body: JSON.stringify(err)};
   }
}