import type { AWS } from "@serverless/typescript";
import functions from "./serverless-config-files/functions";
import resources from "./serverless-config-files/resources";

const serverlessConfiguration: AWS = {
  service: "upload-image",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "myawff",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["s3:*"],
            Resource: ["arn:aws:s3:::uploaded-users-images-bucket/*"],
          },
          {
            Effect: "Allow",
            Action: ["dynamodb:*"],
            Resource: [
              "arn:aws:dynamodb:us-east-1:667001376908:table/images-ids-table",
            ],
          },
        ],
      },
    },
    environment: {
      COGNITO_CLIENT_ID: "${ssm:COGNITO_CLIENT_ID}",
      REGION: "${ssm:REGION}",
      S3_BUCKET_NAME: "${ssm:S3_BUCKET_NAME}",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions,
  resources,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
