import axios from 'axios';

export async function getResponces(endpointsArray)
{
    var responcesArray = [];
    var requestAttempts;
    for(var i = 0; i < endpointsArray.length; i++)
    {
        requestAttempts = 0;
        while(requestAttempts < 3)
        {
            try
            {
                requestAttempts++;
                var responce = await axios.get(endpointsArray[i]);
                responcesArray.push(responce.data);
                break;
            }
            catch(err)
            {
                if(requestAttempts == 3)
                {
                    console.log(err + " " + "Endpoint: " + endpointsArray[i]);
                }
            }
        }
    }
    return responcesArray;
}