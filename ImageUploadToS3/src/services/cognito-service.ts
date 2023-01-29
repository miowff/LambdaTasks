import AWS from "aws-sdk";
import { UserLoginDto } from "src/models/user-login-model";
import { UserRegistrationModel } from "src/models/user-registration-model";

class CognitoService {
  private cognitoClient = new AWS.CognitoIdentityServiceProvider({
    region: process.env.REGION,
  });

  public async signUp(userModel: UserRegistrationModel) {
    const response = await this.cognitoClient.signUp(userModel).promise();
    return response;
  }
  public async signIn(signInRequest: UserLoginDto) {
    const responce = await this.cognitoClient
      .initiateAuth(signInRequest)
      .promise();
    return responce;
  }
}

const cognitoServiceClient = new CognitoService();
export default cognitoServiceClient;
