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
  const uniqueWords = await uniqueValues();
  const result = [];
  const wordsSets = await filesWordsToArrayOfSets();
  uniqueWords.forEach((word) => {
    let counter = 0;
    for (var i = 0; i < wordsSets.length; i++) {
      if (wordsSets[i].has(word)) {
        if (counter === 10) {
          result.push(word);
          break;
        }
        counter++;
      }
    }
  });
  console.log(
    "Словосочетаний, которые есть, как минимум, в десяти файлах: " +
      result.length
  );
}
