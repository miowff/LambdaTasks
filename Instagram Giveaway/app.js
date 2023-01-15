import {existInAllFiles} from './existInAllFiles.js';
import {uniqueValues} from './findUniqueValues.js'
import {existInAtLeastTen} from './existInAtLeastTen.js';


console.time('Time');
let values = await uniqueValues();
console.log(`Уникальных словосечетаний: ${values.size}`);
await existInAllFiles();
await existInAtLeastTen();

console.timeEnd('Time');