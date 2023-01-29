import http from "k6/http";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 100,
  duration: "15s",
};

export default () => {
  const markets = [
    { MarketId: "f9f0fee9-72fd-4e3a-be33-61de86b2ca95", MarketName: "Market1" },
    { MarketId: "ce1144b2-1a6f-4632-8529-c57c79c0922e", MarketName: "Market2" },
    { MarketId: "6b92a41d-00d4-4e1e-9084-ce9d6c544513", MarketName: "Market3" },
    { MarketId: "9aa0ead4-d9c9-4352-8972-461cbe5068f6", MarketName: "Market4" },
    { MarketId: "ad7bf808-53a9-4d65-8c44-acdbf25d78ed", MarketName: "Market5" },
    { MarketId: uuidv4(), MarketName: "RandomMarket" },
  ];

  const data = JSON.stringify(
    markets[Math.floor(Math.random() * markets.length)]
  );
  console.log(data);
  http.post(
    "https://5u55q8r2zh.execute-api.us-east-1.amazonaws.com/dev/send-message-to-SQS",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
