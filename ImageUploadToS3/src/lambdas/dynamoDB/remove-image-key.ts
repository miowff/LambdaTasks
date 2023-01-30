import { S3Event } from "aws-lambda";
import dynamoDBService from "src/services/dynamoDB-service";

export const handler = async (event: S3Event, context, callback) => {
  try {
    const imageKey = decodeURIComponent(event.Records[0].s3.object.key);
    const userName = imageKey.split("/")[0];
    await dynamoDBService.removeImageKey(imageKey, userName);
    callback(null, event);
  } catch (err) {
    callback(null, event);
  }
};
