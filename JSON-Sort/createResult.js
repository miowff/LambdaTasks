import { getResponces } from "./requestsToEndpoints.js";
import { getEndpointsArray } from "./readEndpointsFile.js";
import { findIsDoneField } from "./findIsDoneField.js";
import os from "os";

export async function createResult() {
  const endpointsArray = await getEndpointsArray();
  const responcesArray = await getResponces(endpointsArray);

  let isDoneTrueCounter = 0;
  let isDoneFalseCounter = 0;
  responcesArray.forEach((responce) => {
    let isDoneValue = findIsDoneField(responce);
    if (isDoneValue) {
      isDoneTrueCounter++;
    } else {
      isDoneFalseCounter++;
    }
  });

  return (
    "Значений True: " +
    isDoneTrueCounter +
    os.EOL +
    "Значений False:" +
    isDoneFalseCounter
  );
}
