import fs from "fs/promises";
import { UserModel } from "./Models/UserModel.js";

const jsonVacationData = await fs.readFile("./vacation.json", {
  encoding: "utf8",
});

const result = groupVcations(jsonVacationData);
console.log(result);

function groupVcations(jsonVacationData) {
  const vacationsData = JSON.parse(jsonVacationData);
  const result = [];
  vacationsData.forEach((userData) => {
    const { _id, name } = userData.user;
    let userModel = new UserModel(
      _id,
      name,
      getWeekendDates(userData.usedDays, userData.endDate)
    );

    const existingUserIndex = result.findIndex(
      (user) => user.userId === userModel.userId
    );
    if (existingUserIndex === -1) {
      result.push(userModel);
    } else {
      const newDatesArray = result[existingUserIndex].weekendDates.concat(
        userModel.weekendDates
      );

      result[existingUserIndex].weekendDates = newDatesArray;
    }
  });
  return result;
}

function getWeekendDates(usedDays, endDate) {
  const weekendDates = [];
  if (usedDays === 1) {
    let date = new Date(endDate);
    weekendDates.push(date.toDateString());
    return weekendDates;
  }
  for (let i = 0; i < usedDays; i++) {
    let date = new Date(endDate);
    date.setDate(date.getDate() - i);
    weekendDates.push(date.toDateString());
  }
  return weekendDates;
}
