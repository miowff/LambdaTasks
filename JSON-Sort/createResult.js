import {getResponces} from './requestsToEndpoints.js';
import {getEndpointsArray} from './readEndpointsFile.js';
import {findIsDoneField} from './findIsDoneField.js';
import os from 'os';

export async function createResult()
{
    var endpointsArray = await getEndpointsArray();
    var responcesArray = await getResponces(endpointsArray);

    var isDoneTrueCounter = 0;
    var isDoneFalseCounter = 0;
    responcesArray.forEach(responce => 
    {
        var isDoneValue = findIsDoneField(responce);
        if(isDoneValue)
        {
            isDoneTrueCounter++;
        }
        else
        {
            isDoneFalseCounter++;
        }
    });

    return "Значений True: " + isDoneTrueCounter + os.EOL 
            + "Значений False:" + isDoneFalseCounter;
}