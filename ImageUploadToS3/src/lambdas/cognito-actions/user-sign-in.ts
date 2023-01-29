import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { UserLoginDto } from "src/models/user-login-model";
import cognitoServiceClient from "src/services/cognito-service";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const requestBody = JSON.parse(event.body);
  if (!requestBody) {
    return { statusCode: 400, body: "Request body is empty!" };
  }
  const signInRequest = new UserLoginDto(
    process.env.COGNITO_CLIENT_ID,
    requestBody["Username"],
    requestBody["Password"]
  );
  try {
    const response = await cognitoServiceClient.signIn(signInRequest);
    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
