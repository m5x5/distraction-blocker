import axios from "axios";
import Store from "electron-store";
import jwtDecode from "jwt-decode";
import * as keytar from "keytar";
import { userInfo } from "os";
import url from "url";
import { apiUrl, audienceUrl } from "../main/helpers/api";

const store = new Store({
  accessPropertiesByDotNotation: true,
  configFileMode: 0o666,
});

require("dotenv").config();

let { AUTH0_DOMAIN, AUTH0_CLIENT_ID } = process.env;
AUTH0_DOMAIN = AUTH0_DOMAIN || "";
AUTH0_CLIENT_ID = AUTH0_CLIENT_ID || "";

const redirectUri = apiUrl + "/callback";
console.log('redirectUri', redirectUri)

const keytarService = "electron-openid-oauth";
const keytarAccount = userInfo().username;

let accessToken: string | null = null;
let profile: any | null = store.get("profile");
let refreshToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function getProfile() {
  return profile;
}

export function getAuthenticationURL() {
  console.log('running getAuthenticationURL function');
  return (
    "https://" +
    AUTH0_DOMAIN +
    "/authorize?" +
    `audience=${audienceUrl}&` +
    "scope=openid profile offline_access&" +
    "response_type=code&" +
    "client_id=" +
    AUTH0_CLIENT_ID +
    "&" +
    "redirect_uri=" +
    redirectUri
  );
}

export async function refreshTokens() {
  const refreshToken = await keytar.getPassword(keytarService, keytarAccount);

  if (refreshToken) {
    const refreshOptions = {
      method: "POST",
      url: `https://${AUTH0_DOMAIN}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        grant_type: "refresh_token",
        client_id: AUTH0_CLIENT_ID,
        refresh_token: refreshToken,
      },
    };

    try {
      const response = await axios(refreshOptions);

      accessToken = response.data.access_token;
    } catch (error) {
      console.log(error);
      await logout();

      throw error;
    }
  } else {
    throw new Error("No available refresh token.");
  }
}

export async function loadTokens(callbackURL: string) {
  const urlParts = url.parse(callbackURL, true);
  console.log(urlParts, urlParts.query)
  debugger;
  const query = urlParts.query;
  console.log('running loadTokens function')

  const exchangeOptions = {
    grant_type: "authorization_code",
    client_id: AUTH0_CLIENT_ID,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options = {
    method: "POST",
    url: `https://${AUTH0_DOMAIN}/oauth/token`,
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify(exchangeOptions),
  };

  try {
    const response = await axios(options);

    accessToken = response.data.access_token;
    profile = jwtDecode(response.data.id_token);
    store.set("profile", profile);
    refreshToken = response.data.refresh_token;
    console.log('refreshToken', refreshToken)

    if (refreshToken) {
      await keytar.setPassword(keytarService, keytarAccount, refreshToken);
    }
  } catch (error) {
    console.log("Something went wrong", error);
    await logout();

    throw error;
  }
}

export async function logout() {
  await keytar.deletePassword(keytarService, keytarAccount);
  accessToken = null;
  profile = null;
  refreshToken = null;
}

export function getLogOutUrl() {
  return `https://${AUTH0_DOMAIN}/v2/logout`;
}

export const getHeaders = () => {
  const accessToken = getAccessToken();
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
