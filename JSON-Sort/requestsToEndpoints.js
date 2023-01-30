import axios from "axios";

export const getResp = async (endpointsArray) => {
  const result = await Promise.allSettled(
    endpointsArray.map(async (url) => {
      let requestAttempts = 0;
      while (requestAttempts < 3) {
        try {
          requestAttempts++;
          const { data: result } = await axios.get(url);
          return result;
        } catch (err) {
          if (requestAttempts === 3) {
            console.log(err + " " + "Endpoint: " + url);
          }
        }
      }
    })
  );
  return result;
};
