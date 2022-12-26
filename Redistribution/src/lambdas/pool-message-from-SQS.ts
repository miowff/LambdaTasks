import { SQSEvent } from "aws-lambda";
import requestRepository from "src/database/repositories/requests-repository";
import { RequestData } from "src/models/request-data-model";
import { Request } from "src/models/request-model.ts";

export const handler = async (event:SQSEvent) => 
{
    try
    {
        const sqsMessages = event.Records;
        for(let i=0;i<sqsMessages.length;i++)
        {
            const messageData:RequestData = JSON.parse(sqsMessages[i].body);
            const request:Request =
            {
                MarketId:messageData.MarketId,
                MarketName:messageData.MarketName,
                RequestTime:new Date()
            }

            await requestRepository.addNewAsync(request);
        }
        return {statusCode: 200,body: "Successful"};
    }
    catch(err)
    {
        return {statusCode: 400,body: JSON.stringify(err)};
    }
}