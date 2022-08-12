const {commands,ENTER_REQUEST,ENTER_COMMAND_PROMPT} = require('./constants.js');

const readline = require('readline');
const rl = readline.createInterface(
{input:process.stdin,
 output:process.stdout
});

var alphabetSort = function(wordsArray){ 
  var result = wordsArray.sort(function(a,b){
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
  });

  return result.filter(item =>{
    if(isNaN(parseInt(item))){
      return item;
    }
  });
}

var sortNumbersByAscending = function(wordsAray){
  var result = wordsAray.filter(item =>{
    if(parseInt(item)){
      return item;
    }
  });
 return result.sort(function(a,b){
  return a - b;
 });
}

var sortNumbersByDescanding = function(wordsArray){
  return sortNumbersByAscending(wordsArray).reverse();
}

var sortWordsByQuantityOfLetters = function(wordsAray){
  var result = wordsAray.filter(item =>{
    if(isNaN(parseInt(item))){
      return item;
    }
  });
  return result.sort(function(a,b){
    return a.length - b.length;
  });
}

const distinct = (value,index,self)=>{
  return self.indexOf(value)===index;
}

var onlyUniqueWords = function(wordsAray){
  var result = wordsAray.filter(item =>{
    if(isNaN(parseInt(item))){
      return item;
    }
  });
  return result.filter(distinct);
}

var onlyUniqueValues = function(wordsAray){
  var result = wordsAray.filter(item =>{
    if(parseInt(item)){
      return item;
    }
  });
  return result.filter(distinct);
}

  rl.question(ENTER_REQUEST, function(input) {
    let wordsArray = input.split(" ");

    rl.setPrompt(ENTER_COMMAND_PROMPT);
    rl.prompt();
    
    rl.on('line',inputCommand=>{
      switch(inputCommand){
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
