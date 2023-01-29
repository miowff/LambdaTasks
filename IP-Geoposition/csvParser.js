import os from "os";
import { IpRange } from "./Models/IpRangeModel.js";

export function parseCsvData(fileData) {
  let fileRowsArray = fileData.split(os.EOL);
  const result = [];
  fileRowsArray.forEach((row) => {
    if (row.includes("-")) {
      return;
    }
    let splitedRow = row.replace("'", "").split(",");
    if (splitedRow.length < 4) {
      return;
    }
    let ipRange = new IpRange(
      parseInt(splitedRow[0].replace(/^"|"$/g, "")),
      parseInt(splitedRow[1].replace(/^"|"$/g, "")),
      splitedRow[2].replace(/^"|"$/g, ""),
      splitedRow[3].replace(/^"|"$/g, "")
    );
    result.push(ipRange);
  });
  return result;
}
