import fs from 'fs/promises';
import { UserModel } from './Models/UserModel.js';

var jsonVacationData = await fs.readFile('./vacation.json',{encoding:'utf8'});

var result = groupVcations(jsonVacationData);
var a = JSON.stringify(result);
var b = JSON.parse(a);
b.forEach(element => {
    console.log(element);
});

function groupVcations(jsonVacationData)
{
    var vacationsData = JSON.parse(jsonVacationData);
    var result = [];
    vacationsData.forEach(userData => 
        {
            var userModel = new UserModel(userData.user._id,
                userData.user.name,getWeekendDates(userData.usedDays,userData.endDate));

            var existingUserIndex = result.findIndex(user => user.userId === userModel.userId);
            if(existingUserIndex == -1)
            {
                result.push(userModel);
            }
            else
            {
                var newDatesArray = result[existingUserIndex].weekendDates
                                    .concat(userModel.weekendDates);

                result[existingUserIndex].weekendDates = newDatesArray;
            }
        });
    return result;
}

function getWeekendDates(usedDays,endDate)
{
    var weekendDates = [];
    if(usedDays == 1)
    {
        var date = new Date(endDate);
        weekendDates.push(date.toDateString());
        return weekendDates;
    }
    else
    {
        for(var i = 0;i < usedDays; i++)
        {
            var date = new Date(endDate);
            date.setDate(date.getDate() - i);
            weekendDates.push(date.toDateString());
        }
        return weekendDates;
    }
}