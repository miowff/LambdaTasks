import { upload, generatePublicUrl } from "./googleUploader.js";
import { shortUrl } from "./shortUrl.js";
import inquirer from "inquirer";
import { questions } from "./questions.js";

async function getAnswers() {
  const answers = await inquirer.prompt(questions);
  const path = answers.ImageUrl;
  const fileId = await upload(answers.FileName, path);
  const publicUrl = await generatePublicUrl(fileId);
  if (answers.ShortLink) {
    const shortedLink = await shortUrl(publicUrl);
    console.log(shortedLink);
  } else {
    console.log(publicUrl);
  }
}

await getAnswers();
