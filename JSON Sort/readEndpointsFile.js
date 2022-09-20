import fs from 'fs/promises';
import os from 'os';

export async function getEndpointsArray()
{
    var endpoints = await fs.readFile('./endpoints.txt',{encoding:'utf8'});
    var endpointsArray = endpoints.split(os.EOL);
    return endpointsArray;
}