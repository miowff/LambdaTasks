import { readCsvFile } from "./fileReader.js";
import { parseCsvData } from "./csvParser.js";
import { binarySearch } from "./binarySearch.js";
import { ipToInt } from "./ipToInt.js";
import express from "express";
import { ResultModel } from "./Models/resultModel.js";
import { CSV_FILE_PATH, PORT } from "./constants.js";

const app = express();

const fileData = await readCsvFile(CSV_FILE_PATH);
const IP_RANGES = parseCsvData(fileData);

app.get("/getIpData", function (request, responce) {
  try {
    let ip = request.headers["x-forwarded-for"];
    if (!ip) {
      const ipAddress = request.socket.remoteAddress.split(":");
      ip = ipAddress[ipAddress.length-1];
    }
    const intIp = ipToInt(ip);
    const resultRange = binarySearch(IP_RANGES, intIp);
    const result = new ResultModel(ip, resultRange.countryName);
    responce.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
