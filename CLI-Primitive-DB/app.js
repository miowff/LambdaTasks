import inquirer from 'inquirer';
import {questions,dbActionQuestions} from './constants.js';
import {addUserToDb,getUsersByName} from './interactDbModule.js';
import {UserModel} from './Models/UserModel.js';
import os from 'os';

function findUsersByName(name, readFileResult)
{
  var sameNameUsers = [];
  var users = readFileResult.toString().split(os.EOL);
  for(let i = 0; i < users.length - 1; i++)
  {
    let user = JSON.parse(users[i]);
    if(user.Name == name)
    {
      sameNameUsers.push(user);
    }
  }
  return sameNameUsers;  
}

function getAnswers() 
{
    return inquirer.prompt(questions).then((answers) => 
    {
      var newUser = new UserModel(answers.Name,answers.Gender,answers.Age);
      addUserToDb(newUser);
      if(answers.GetValuesFromDb)
      {
        return inquirer.prompt(dbActionQuestions).then((answers) => 
        {
          var usersFromDb = getUsersByName();
          var users = findUsersByName(answers.Name,usersFromDb);
          console.log(users);
        });
      }
      return getAnswers(questions);
    });
}


getAnswers();



process.stdin.on('keypress', (_, key) => 
{
    if (key.name === "escape") 
    {
      exit();
    }
});
