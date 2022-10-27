import {existInAllFiles} from './existInAllFiles.js';
import {uniqueValues} from './findUniqueValues.js'
import {existInAtLeastTen} from './existInAtLeastTen.js';
import {quickSort} from './quickSort.js';
import {binarySearch} from './binarySearch.js';
import fs from 'fs/promises';
import os from 'os';

console.time('Time');
await existInAtLeastTen();
console.timeEnd('Time');