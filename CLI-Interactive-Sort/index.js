const {
  commands,
  ENTER_REQUEST,
  ENTER_COMMAND_PROMPT,
} = require("./constants.js");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const alphabetSort = function (wordsArray) {
  let result = wordsArray.sort(function (a, b) {return a>b});

  return result.filter((item) => {
    if (isNaN(parseInt(item))) {
      return item;
    }
  });
};

const sortNumbersByAscending = function (wordsAray) {
  var result = wordsAray.filter((item) => {
    if (parseInt(item)) {
      return item;
    }
  });
  return result.sort(function (a, b) {
    return a - b;
  });
};

const sortNumbersByDescanding = function (wordsArray) {
  return sortNumbersByAscending(wordsArray).reverse();
};

const sortWordsByQuantityOfLetters = function (wordsAray) {
  const result = wordsAray.filter((item) => {
    if (isNaN(parseInt(item))) {
      return item;
    }
  });
  return result.sort(function (a, b) {
    return a.length - b.length;
  });
};

const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};

const onlyUniqueWords = function (wordsAray) {
  const result = wordsAray.filter((item) => {
    if (isNaN(parseInt(item))) {
      return item;
    }
  });
  return result.filter(distinct);
};

const onlyUniqueValues = function (wordsAray) {
  const result = wordsAray.filter((item) => {
    if (parseInt(item)) {
      return item;
    }
  });
  return result.filter(distinct);
};

rl.question(ENTER_REQUEST, function (input) {
  const wordsArray = input.split(" ");

  rl.setPrompt(ENTER_COMMAND_PROMPT);
  rl.prompt();

  rl.on("line", (inputCommand) => {
    switch (inputCommand) {
      case commands.Exit:
        rl.close();
        return;
      case commands.AlphabetSort:
        console.log(alphabetSort(wordsArray));
        break;
      case commands.OnlyUniqueValues:
        console.log(onlyUniqueValues(wordsArray));
        break;
      case commands.OnlyUniqueWords:
        console.log(onlyUniqueWords(wordsArray));
        break;
      case commands.SortNumbersByAscending:
        console.log(sortNumbersByAscending(wordsArray));
        break;
      case commands.SortNumbersByDescanding:
        console.log(sortNumbersByDescanding(wordsArray));
        break;
      case commands.WordsByQuantityOfLetters:
        console.log(sortWordsByQuantityOfLetters(wordsArray));
        break;
    }
    rl.prompt();
  });
});