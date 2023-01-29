import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  signUp: {
    handler: "src/lambdas/cognito-actions/user-sign-up.handler",
    events: [
      {
        http: {
          path: "signUp",
          method: "post",
          cors: true,
        },
      },
    ],
  },
  signIn: {
    handler: "src/lambdas/cognito-actions/user-sign-in.handler",
    events: [
      {
        http: {
          path: "signIn",
          method: "post",
          cors: true,
        },
      },
    ],
  },
  preSignUp: {
    handler: "src/lambdas/cognito-actions/sign-up-confirm.handler",
    events: [
      {
        cognitoUserPool: {
          pool: "upload-image-user-pool",
          trigger: "PreSignUp",
          existing: true,
        },
      },
    ],
  },
  addItem: {
    handler: "src/lambdas/dynamoDB-actions/add-user-item-key.handler",
    events: [
      {
        s3: {
          bucket: "uploaded-users-images-bucket",
          event: "s3:ObjectCreated:*",
          existing: true,
        },
      },
    ],
  },
  deleteImageKey: {
    handler: "src/lambdas/dynamoDB-actions/remove-image-key.handler",
    events: [
      {
        s3: {
          bucket: "uploaded-users-images-bucket",
          event: "s3:ObjectRemoved:*",
          existing: true,
        },
      },
    ],
  },
  createPresignedPost: {
    handler: "src/lambdas/s3-actions/create-presigned-post.handler",
    events: [
      {
        http: {
          path: "create-presigned-post",
          method: "post",
          cors: true,
          authorizer: {
            name: "cognito-authorizer",
            arn: "arn:aws:cognito-idp:us-east-1:667001376908:userpool/us-east-1_9WHBZjLOA",
          },
        },
      },
    ],
  },
  deleteImage: {
    handler: "src/lambdas/s3-actions/delete-image.handler",
    events: [
      {
        http: {
          path: "delete-image",
          method: "delete",
          cors: true,
          authorizer: {
            name: "cognito-authorizer",
            arn: "arn:aws:cognito-idp:us-east-1:667001376908:userpool/us-east-1_9WHBZjLOA",
          },
        },
      },
    ],
  },
  myImages: {
    handler: "src/lambdas/s3-actions/get-all-user-images.handler",
    events: [
      {
        http: {
          path: "my-images",
          method: "get",
          cors: true,
          authorizer: {
            name: "cognito-authorizer",
            arn: "arn:aws:cognito-idp:us-east-1:667001376908:userpool/us-east-1_9WHBZjLOA",
          },
        },
      },
    ],
  },
};
export default functions;
