import axios from "axios";

const URL = "https://picsum.photos/200/300";

export function getPhotoUrl() {
  return axios({
    method: "get",
    url: URL,
    responseType: "stream",
  }).then(function (response) {
    return response.data.responseUrl;
  });
}
