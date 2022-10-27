import fs from 'fs/promises';
import {quickSort} from './quickSort.js';
import {uniqueValues} from './findUniqueValues.js';

function getIntersection(arrayA,arrayB)
{
    var arrayASet = new Set(arrayA);
    var result = [];
    for (var i = 0; i < arrayB.length; i++)
    {
        if (arrayASet.has(arrayB[i]))
        {
            result.push(arrayB[i]);
        }
    }
    return result;
}

export async function existInAllFiles()
{
    const FILES_COUNT = 20;
    var words0 = await fs.readFile(`./LargeWordsFiles/out0.txt`, { encoding: 'utf8' });
    var wordsArray0 = words0.toString().split('\n'); 
    var words1 = await fs.readFile(`./LargeWordsFiles/out1.txt`, { encoding: 'utf8' });
    var wordsArray1 = words1.toString().split('\n');
    var result = getIntersection(wordsArray0,wordsArray1);
    for(var i = 2;i< FILES_COUNT; i++)
    {
        var outWords = await fs.readFile(`./LargeWordsFiles/out${i}.txt`, { encoding: 'utf8' });
        var wordsArray = outWords.toString().split('\n');
        result = getIntersection(result,wordsArray);
    }
    var resultSet = new Set(result);
    console.log("Словосочетаний, которые есть во всех 20 файлах:" + resultSet.size);
}
