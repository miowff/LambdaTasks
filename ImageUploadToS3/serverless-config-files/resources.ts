import type { AWS } from '@serverless/typescript';

const resources:AWS['resources']=
{
    Resources:
    {
      S3ImagesBucket:
      {
        Type:'AWS::S3::Bucket',
        Properties:
        {
          BucketName:'uploaded-users-images-bucket',
          AccessControl:'Private',
          CorsConfiguration:
          {
            CorsRules:
            [
              {
                AllowedHeaders: ["*"],
                AllowedMethods: ['GET','PUT','POST','DELETE','HEAD'],
                AllowedOrigins: ["*"],
                ExposedHeaders: ["ETag"],
              }
            ]
          },
        }
      },
     
      CognitoUserPool:
      {
        Type:'AWS::Cognito::UserPool',
        Properties:
        {
          UserPoolName:'upload-image-user-pool',
          UsernameAttributes:['email'],
          AutoVerifiedAttributes:['email']
        }
      },
      CognitoUserPoolCient:
      {
        Type:'AWS::Cognito::UserPoolClient',
        Properties:
        {
          ClientName:'upload-image-user-pool-client',
          UserPoolId:
          {
            Ref: 'CognitoUserPool'
          },
          ExplicitAuthFlows:['ADMIN_NO_SRP_AUTH','USER_PASSWORD_AUTH'],
          GenerateSecret:false
        }
      },
      ImagesIdDynamoDbTable:
      {
        Type:'AWS::DynamoDB::Table',
        Properties:
        {
          TableName:'images-ids-table',
          AttributeDefinitions:
          [
            {AttributeName:'UserName',AttributeType:'S'}
          ],
          KeySchema:
          [
            {AttributeName:'UserName',KeyType:'HASH'}
          ],
          BillingMode:'PAY_PER_REQUEST'
        }
      }

    }
};
export default resources;