import fs from "fs/promises";

export async function uniqueValues() {
  const FILES_COUNT = 20;
  let result = new Set();
  for (var i = 0; i < FILES_COUNT; i++) {
    const outWords = await fs.readFile(`./LargeWordsFiles/out${i}.txt`, {
      encoding: "utf8",
    });
    const wordsArray = outWords.toString().split("\n");
    const set = new Set(wordsArray);
    result = new Set([...result, ...set]);
  }
  return result;
}
