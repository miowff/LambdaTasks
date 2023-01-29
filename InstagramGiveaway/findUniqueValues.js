import fs from 'fs/promises';

export async function uniqueValues()
{
    const FILES_COUNT = 20;
    var result = new Set();
    for(var i = 0;i< FILES_COUNT; i++)
    {
        var outWords = await fs.readFile(`./LargeWordsFiles/out${i}.txt`, { encoding: 'utf8' });
        var wordsArray = outWords.toString().split('\n');
        var set = new Set(wordsArray);
        result = new Set([...result, ...set]);
    }
    return result;
}
