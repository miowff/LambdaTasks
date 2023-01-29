import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import s3Service from "src/services/s3-service";
import jwt from "jsonwebtoken";
import dynamoDBService from "src/services/dynamoDB-service";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  try {
    const imageName = body.ImageName;
    const decodedToken = jwt.decode(event.headers["Authorization"], {
      complete: true,
    });
    const userEmail = decodedToken.payload.email;
    const imageKey = userEmail + `/${imageName}`;
    const items = await dynamoDBService.findUserImageKeys(userEmail);
    if (!items.includes(imageKey)) {
      return {
        statusCode: 400,
        body: JSON.stringify(`You dont have image: ${imageName}.`),
      };
    }

    await s3Service.deleteImage(imageKey);

    return {
      statusCode: 200,
      body: JSON.stringify(`Image ${imageName} removed.`),
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
