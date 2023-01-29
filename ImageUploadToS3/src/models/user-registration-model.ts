import { AttributeType } from "aws-sdk/clients/cognitoidentityserviceprovider";

export interface UserRegistrationModel {
  ClientId: string;
  Username: string;
  Password: string;
  UserAttributes?: Array<AttributeType>;
}
