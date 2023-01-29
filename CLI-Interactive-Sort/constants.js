const commands = 
{
  Exit: '1',
  AlphabetSort: '2',
  SortNumbersByAscending: '3',
  SortNumbersByDescanding:'4',
  WordsByQuantityOfLetters:'5',
  OnlyUniqueWords:'6',
  OnlyUniqueValues:'7'
};

const ENTER_REQUEST = "Enter your words or dights: ";

const ENTER_COMMAND_PROMPT = `
Alphabet sort: Enter '2' 
Sort numbers by ascending: Enter '3' 
Sort numbers by descanding: Enter '4' 
Order words by quantity of letters: Enter '5' 
Only unique words: Enter '6'
Only unique numbers: Enter '7'
Exit: Enter '1'`

module.exports = 
{
commands:commands,
ENTER_REQUEST:ENTER_REQUEST,
ENTER_COMMAND_PROMPT:ENTER_COMMAND_PROMPT
};