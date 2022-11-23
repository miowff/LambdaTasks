import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  service: 'serverles',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'myawff',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: 
  { 
    helloUsername:
    {
      handler:'src/lambdas/hello-username.handler',
      events:
      [
        {http:{path:'hello-username/{username}',method:'get',cors:true}}
      ]
    },
    fibonacciNumbers:
    {
      handler:'src/lambdas/fibonacci-numbers.handler',
      events:
      [
        {http:{path:'fibonacci-numbers',method:'get',cors:true}}
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
