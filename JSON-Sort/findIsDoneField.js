export function findIsDoneField(jsonResponce) {
  const IS_DONE_KEY = "isDone";
  const keys = Object.keys(jsonResponce);
  let result;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === IS_DONE_KEY) {
      result = jsonResponce[keys[i]];
      break;
    }
    if (
      typeof jsonResponce[keys[i]] === "object" &&
      !Array.isArray(jsonResponce[keys[i]])
    ) {
      result = findIsDoneField(jsonResponce[keys[i]]);
      if (result === true || result === false) {
        return result;
      }
    }
  }
  return result;
}
