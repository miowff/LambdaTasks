import fs from "fs/promises";

export async function readCsvFile(path) {
  let ipRangesFileData = await fs.readFile(path, { encoding: "utf-8" });
  return ipRangesFileData;
}
