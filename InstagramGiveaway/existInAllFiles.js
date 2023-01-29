import fs from "fs/promises";
function getIntersection(arrayA, arrayB) {
  const arrayASet = new Set(arrayA);
  const result = [];
  for (var i = 0; i < arrayB.length; i++) {
    if (arrayASet.has(arrayB[i])) {
      result.push(arrayB[i]);
    }
  }
  return result;
}

export async function existInAllFiles() {
  const FILES_COUNT = 20;
  let words0 = await fs.readFile(`./LargeWordsFiles/out0.txt`, {
    encoding: "utf8",
  });
  let wordsArray0 = words0.toString().split("\n");
  let words1 = await fs.readFile(`./LargeWordsFiles/out1.txt`, {
    encoding: "utf8",
  });
  let wordsArray1 = words1.toString().split("\n");
  let result = getIntersection(wordsArray0, wordsArray1);
  for (let i = 2; i < FILES_COUNT; i++) {
    let outWords = await fs.readFile(`./LargeWordsFiles/out${i}.txt`, {
      encoding: "utf8",
    });
    let wordsArray = outWords.toString().split("\n");
    result = getIntersection(result, wordsArray);
  }
  const resultSet = new Set(result);
  console.log(
    "Словосочетаний, которые есть во всех 20 файлах:" + resultSet.size
  );
}
