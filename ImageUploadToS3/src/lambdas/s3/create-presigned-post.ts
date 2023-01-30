import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import s3Service from "src/services/s3-service";
import jwt from "jsonwebtoken";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  try {
    const decodedToken = jwt.decode(event.headers["Authorization"], {
      complete: true,
    });
    const userEmail = decodedToken.payload.email;
    const imageName = body.ImageName;
    const contentType = body.ContentType;
    const presignedPost = await s3Service.createPresignedPost(
      userEmail,
      imageName,
      contentType
    );
    return { statusCode: 200, body: JSON.stringify(presignedPost) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
