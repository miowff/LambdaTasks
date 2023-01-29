import fs from "fs/promises";
import os from "os";

export async function getEndpointsArray() {
  let endpoints = await fs.readFile("./endpoints.txt", { encoding: "utf8" });
  let endpointsArray = endpoints.split(os.EOL);
  return endpointsArray;
}
