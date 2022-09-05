import {upload,generatePublicUrl} from './googleUploader.js';
import {shortUrl} from './shortUrl.js';
import inquirer from 'inquirer';
import { questions } from './questions.js';

async function getAnswers()
{
    var answers = await inquirer.prompt(questions);
    var path = answers.ImageUrl;
    var fileId = await upload(answers.FileName,path);
    var publicUrl = await generatePublicUrl(fileId);
    if(answers.ShortLink)
    {
        var shortedLink = await shortUrl(publicUrl);
        console.log(shortedLink);
    }
    else
    {
        console.log(publicUrl);
    }
}

await getAnswers();