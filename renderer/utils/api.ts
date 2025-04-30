import { ipcRenderer } from "electron";

let accessToken = null;

export const getAccessToken = async () => {
  const token = await ipcRenderer.invoke("getAccessToken");

  if (!token) {
    // throw new Error("No access token");
  }

  return token;
};

export const getHeaders = async () => {
  if (!accessToken) {
    accessToken = await getAccessToken();
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
