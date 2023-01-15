import fs from 'fs/promises';
import {uniqueValues} from './findUniqueValues.js';


async function filesWordsToArrayOfSets()
{
    const FILES_COUNT = 20;
    var wordsSets = [];
    for(var i = 0; i < FILES_COUNT; i++)
    {
        var words = await fs.readFile(`./LargeWordsFiles/out${i}.txt`, { encoding: 'utf8' });
        var wordsArray =  words.toString().split('\n');
        wordsSets.push(new Set(wordsArray));
    }
    return wordsSets;
}

export async function existInAtLeastTen()
{
    var uniqueWords = await uniqueValues();
    var result = [];
    var wordsSets = await filesWordsToArrayOfSets();
    uniqueWords.forEach(word =>
    {
        var counter = 0;
        for(var i = 0; i< wordsSets.length; i++)
        {
            if(wordsSets[i].has(word))
            {
                if(counter == 10)
                {
                    result.push(word);  
                    break;
                }
                counter++;
            }

        }
    });
    console.log("Словосочетаний, которые есть, как минимум, в десяти файлах: " + result.length);
}

