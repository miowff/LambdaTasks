export function findIsDoneField(jsonResponce)
{
    const IS_DONE_KEY = 'isDone';
    var keys = Object.keys(jsonResponce);
    var result;
    for(var i = 0;i < keys.length;i++)
    {
        if(keys[i] === IS_DONE_KEY)
        {
            result = jsonResponce[keys[i]];
            break;
        }
        if(typeof(jsonResponce[keys[i]]) == 'object' && !Array.isArray(jsonResponce[keys[i]]))
        {
            result = findIsDoneField(jsonResponce[keys[i]]);
            if(result == true || result == false)
            {
                return result;
            }
        }
    }
    return result;
}