import {TIME_RATES,MIMETYPE} from "../constants.js";
import {DeadlineResult} from '../models/deadlineResult.js';
import dateFormat from 'dateformat';

export function deadlineCounter(requestData,requestDate)
{
    var timeRates = TIME_RATES[requestData.language];
    var hoursToDo = 0.5 +(requestData.count / timeRates);
    if(hoursToDo < 1)
    {
        hoursToDo = 1;
    }
    if(requestData.mimetype == MIMETYPE.OTHER)
    {
        hoursToDo = hoursToDo * 1.2;
    }
    
    var deadlineDate = deadlineDateCounter(hoursToDo,requestDate);
    var unixDeadlineDate = Math.floor(deadlineDate.getTime() / 1000);
    var deadlineResult = new DeadlineResult(unixDeadlineDate,
            dateFormat(deadlineDate,"dd/mm/yyyy/HH:MM"),hoursToDo);
    return deadlineResult;
}


function deadlineDateCounter(hoursToCount,requestDate)
{
    var minutes = (hoursToCount - Math.trunc(hoursToCount)) * 60;
    if(minutes > 0)
    {
        requestDate.setMinutes(requestDate.getMinutes() + minutes);  
    }
    while(hoursToCount > 0)
    {
        var hours = requestDate.getHours();
        var day = requestDate.getDay();
        if(day == 6 || day == 0)
        {
            requestDate.setDate(requestDate.getDate() + 1);
            continue;
        }
        if(hours < 10)
        {
            requestDate.setHours(10);
            continue;
        }
        if(hours >= 19)
        {
            requestDate.setDate(requestDate.getDate() + 1);
            requestDate.setHours(10);
            continue;
        }
        requestDate.setHours(hours + 1);
        hoursToCount--;
    }

    return requestDate;
}
