import axios from "axios";
import { TINY_URL_API_TOKEN } from "./tokens.js";

export async function shortUrl(url) {
  const tinyUrlRequest = "https://api.tinyurl.com/create";
  let dto = {
    url: url,
    domain: "tiny.one",
  };
  try {
    const result = await axios.post(tinyUrlRequest, dto, {
      headers: {
        Authorization: `Bearer ${TINY_URL_API_TOKEN}`,
      },
    });
    return result.data.data.tiny_url;
  } catch (err) {
    console.log(err.message);
  }
}
