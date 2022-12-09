import dynamoDBService from "src/services/dynamoDB-service";

export const handler = async (event, context, callback)=> 
{
    const imageKey = decodeURIComponent(event.Records[0].s3.object.key);
    const userName = imageKey.split('/')[0];
    try
    {
        const existingImagekeys = await dynamoDBService.findUserImageKeys(userName);
        if(existingImagekeys)
        {
            await dynamoDBService.addImageKey(imageKey,userName);
            callback(null, event);
        }
    }
    catch(err)
    {
        await dynamoDBService.createUserImageKeys(userName,imageKey);
        callback(null, event);
    }
};