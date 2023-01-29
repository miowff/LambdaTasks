import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  FOLDER_ID,
} from "./tokens.js";

let accessToken = await getAccesToken();

export async function upload(fileName, path) {
  const uploadUrl =
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
  try {
    let file = fs.createReadStream(path);
    let formData = new FormData();
    let fileMetadata = {
      name: fileName,
      mimeType: "image/jpg",
      parents: [FOLDER_ID],
    };
    formData.append("metadata", JSON.stringify(fileMetadata), {
      contentType: "application/json",
    });
    formData.append("data", file, {
      filename: fileName + ".jpeg",
    });
    const result = await axios.post(uploadUrl, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result.data.id;
  } catch (err) {
    console.log(err.message);
  }
}

export async function generatePublicUrl(fileId) {
  createPermissionsForFile(fileId);
  return `https://drive.google.com/open?id=${fileId}`;
}

async function createPermissionsForFile(fileId) {
  const fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`;
  try {
    await axios.post(
      fileUrl,
      {
        role: "reader",
        type: "anyone",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
}

async function getAccesToken() {
  try {
    const result = await axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      {
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
      }
    );
    return result.data.access_token;
  } catch (err) {
    console.log(err);
  }
}
