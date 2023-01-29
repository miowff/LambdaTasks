import fs from "fs";

export const questions = [
  {
    type: "input",
    name: "ImageUrl",
    message: "Drag and drop image url",
    validate: (answer) => {
      if (!fs.existsSync(answer)) {
        return "Please enter a valid path";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "FileName",
    message: "Set file name",
    validate: (answer) => {
      if (answer == "") {
        return "Please enter a valid name";
      }
      return true;
    },
  },
  {
    type: "confirm",
    name: "ShortLink",
    message: "Do you want to short link",
  },
];
