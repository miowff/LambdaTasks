import AWS from 'aws-sdk';

class DynamoDBService
{
    private dynamoDBDocClient = new AWS.DynamoDB.DocumentClient({region:process.env.REGION});

    public async createUserImageKeys(userName:string,imageKey:string)
    {
        this.dynamoDBDocClient.createSet
        await this.dynamoDBDocClient.put(
        {
            TableName:"images-ids-table",
            Item:
            {
                UserName:userName,
                ImageKeys:this.dynamoDBDocClient.createSet([imageKey])
            }
        }).promise()
    }
    public async findUserImageKeys(userName:string)
    {
        const query = 
        {
            TableName: "images-ids-table",
            KeyConditionExpression: "UserName = :UserName",
            ExpressionAttributeValues: 
            {
                ":UserName": String(userName)
            }
        }
        const item = await this.dynamoDBDocClient.query(query).promise();
        return item.Items[0].ImageKeys['values'] as string[];
    }
    public async addImageKey(imageKey:string,userName:string)
    {
        const query =
        {
            TableName: "images-ids-table",
            Key: 
            {
                UserName: userName
            },
            UpdateExpression: 'ADD ImageKeys :ImageKey',
            ExpressionAttributeValues: 
            {  
                ":ImageKey": this.dynamoDBDocClient.createSet([imageKey])
            }
        }
        await this.dynamoDBDocClient.update(query).promise();
    }
    public async removeImageKey(imageKey:string,userName:string)
    {
        const query =
        {
            TableName: "images-ids-table",
            Key: 
            {
                UserName: userName
            },
            UpdateExpression: 'DELETE ImageKeys :ImageKey',
            ExpressionAttributeValues: 
            {  
                ":ImageKey": this.dynamoDBDocClient.createSet([imageKey])
            }
        }
        await this.dynamoDBDocClient.update(query).promise();
    }
}

const dynamoDBService = new DynamoDBService()
export default dynamoDBService;