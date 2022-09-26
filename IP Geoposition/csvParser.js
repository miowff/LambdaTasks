import os from 'os';
import {IpRange} from './Models/IpRangeModel.js';


export function parseCsvData(fileData)
{
    var fileRowsArray = fileData.split(os.EOL);
    var result = [];
    fileRowsArray.forEach(row => 
    {
        if(row.includes("-"))
        {
            return;
        }
        var splitedRow = row.replace("'","").split(',');
        if(splitedRow.length < 4)
        {
            return;
        }
        var ipRange = new IpRange(parseInt(splitedRow[0].replace(/^"|"$/g, "")),
                        parseInt(splitedRow[1].replace(/^"|"$/g, "")),
                        splitedRow[2].replace(/^"|"$/g, ""),
                        splitedRow[3].replace(/^"|"$/g, ""));
        result.push(ipRange);
    });
    return result;
}