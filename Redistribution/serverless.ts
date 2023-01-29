import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "redistribution",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "myawff",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["sqs:*"],
            Resource: "arn:aws:sqs:us-east-1:667001376908:RedistributionSQS",
          },
        ],
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      RDS_MYSQL_USERNAME: "${ssm:RDS_MYSQL_USERNAME}",
      RDS_MYSQL_PASSWORD: "${ssm:RDS_MYSQL_PASSWORD}",
      RDS_MYSQL_PORT: "${ssm:RDS_MYSQL_PORT}",
      RDS_MYSQL_ENDPOINT: "${ssm:RDS_MYSQL_ENDPOINT}",
      RDS_MYSQL_DB_NAME: "${ssm:RDS_MYSQL_DB_NAME}",
      SQS_URL: "${ssm:REDISTRIBUTION_SQS_URL}",
    },
  },
  functions: {
    sendMessageToSQS: {
      handler: "src/lambdas/send-message-to-query.handler",
      events: [
        { http: { path: "send-message-to-SQS", method: "post", cors: true } },
      ],
    },
    queryMessagesHandler: {
      handler: "src/lambdas/pool-message-from-SQS.handler",
      events: [
        {
          sqs: {
            arn: "arn:aws:sqs:us-east-1:667001376908:RedistributionSQS",
            batchSize: 10,
            maximumBatchingWindow: 30,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      RedistributionSQS: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "RedistributionSQS",
        },
      },
      RedistributionDB: {
        Type: "AWS::RDS::DBInstance",
        Properties: {
          Engine: "MySQL",
          DBName: "RedistributionDB",
          DBInstanceClass: "db.t3.micro",
          MasterUsername: "${ssm:RDS_MYSQL_USERNAME}",
          MasterUserPassword: "${ssm:RDS_MYSQL_PASSWORD}",
          AllocatedStorage: "5",
          BackupRetentionPeriod: 0,
          PubliclyAccessible: true,
        },
      },
    },
  },
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
