import { createResult } from "./createResult.js";

console.time("Time");
const result = await createResult();
console.log(result);
console.timeEnd("Time");
