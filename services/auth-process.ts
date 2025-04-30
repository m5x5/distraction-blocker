import { BrowserWindow, WebPreferences } from "electron";
import { audienceUrl } from "../main/helpers/api";
import { showWindow } from "../main/services/window";
import {
  getAuthenticationURL,
  getLogOutUrl,
  loadTokens,
  logout,
} from "./auth-service";

let win: BrowserWindow | null = null;

export function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    } as WebPreferences,
  });

  win.loadURL(getAuthenticationURL());

  const {
    session: { webRequest },
  } = win.webContents;

  const filter = {
    urls: [audienceUrl + "/callback*"],
  };
  webRequest.onBeforeRequest(filter, async ({ url }) => {
    await loadTokens(url);
    showWindow("home");
    return destroyAuthWin();
  });

  // @ts-ignore
  win.on("authenticated", () => {
    destroyAuthWin();
  });

  win.on("closed", () => {
    win = null;
  });
}

export function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

export function createLogoutWindow() {
  const logoutWindow = new BrowserWindow({
    show: false,
  });

  logoutWindow.loadURL(getLogOutUrl());

  logoutWindow.on("ready-to-show", async () => {
    logoutWindow.close();
    await logout();
  });
}
