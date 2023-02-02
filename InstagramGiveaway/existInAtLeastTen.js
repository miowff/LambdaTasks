import fs from "fs/promises";
import { uniqueValues } from "./findUniqueValues.js";

async function filesWordsToArrayOfSets() {
  const FILES_COUNT = 20;
  const wordsSets = [];
  for (var i = 0; i < FILES_COUNT; i++) {
    var words = await fs.readFile(`./LargeWordsFiles/out${i}.txt`, {
      encoding: "utf8",
    });
    var wordsArray = words.toString().split("\n");
    wordsSets.push(new Set(wordsArray));
  }
  return wordsSets;
}

export async function existInAtLeastTen() {
  const uniqueWords = Array.from(await uniqueValues());
  const wordsSets = await filesWordsToArrayOfSets();
  const res = uniqueWords.reduce((acc, value) => {
    let counter = 0;
    for (var i = 0; i < wordsSets.length; i++) {
      if (wordsSets[i].has(value)) {
        counter++;
        if (counter === 10) {
          acc.push(value);
          break;
        }
      }
    }
    return acc;
  }, []);
  console.log(
    "Словосочетаний, которые есть, как минимум, в десяти файлах: " + res.length
  );
}
