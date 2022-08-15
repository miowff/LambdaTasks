import path from 'path';
import fs from 'fs';
import os from 'os';

const dbPath = path.join('Database','DB.txt');

export function addUserToDb(userModel) 
{ 
    fs.appendFile(dbPath,JSON.stringify(userModel) + os.EOL , (err)=>
    {
        if(err) throw err;
    });
}

export function getUsersByName()
{
    return fs.readFileSync(dbPath,'utf-8', (err)=>
    {
        if(err) throw err;
    });
}
