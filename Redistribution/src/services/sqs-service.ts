import AWS from "aws-sdk";
import { SendMessageRequest } from "aws-sdk/clients/sqs";
import { RequestData } from "src/models/request-data-model";

class SqsService {
  private sqs = new AWS.SQS({ region: "us-east-1" });

  public async sendMessageToQuery(messageData: RequestData): Promise<boolean> {
    try {
      const request: SendMessageRequest = {
        QueueUrl: process.env.SQS_URL,
        MessageBody: JSON.stringify(messageData),
      };
      await this.sqs.sendMessage(request).promise();
      return true;
    } catch (err) {
      return false;
    }
  }
}

const sqsService = new SqsService();
export default sqsService;
