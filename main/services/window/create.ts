import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import "../../helpers/menu";

const isProd = process.env.NODE_ENV === "production";

export default (
  options: BrowserWindowConstructorOptions = {}
): BrowserWindow => {
  let win: BrowserWindow | null = null;

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    autoHideMenuBar: true,
    fullscreen: true,
    alwaysOnTop: isProd,
    minimizable: false,
    frame: !isProd,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  };
  win = new BrowserWindow(browserOptions);

  return win;
};
