import { createAuthWindow } from "../../../services/auth-process";
import { refreshTokens } from "../../../services/auth-service";
import { createWindow } from "../../helpers";
import {
  EIGHT_HOURS_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
} from "../../helpers/const";
import { isDistracted } from "../../helpers/enforce-mode";
import { getLastGoal, Mode } from "../../helpers/goals";
import { initMenu } from "../../helpers/menu";
import { isProd, port } from "../../helpers/process";
import tracker from "../../helpers/time-tracker";
import { classifyWindow } from "./classify";

let mainWindow: Electron.BrowserWindow | null;
let lastWindowMode = "";
let openingWindow = false;

export const showWindowIfNeeded = async () => {
  if (openingWindow) return;
  openingWindow = true;

  const { mode: windowMode } = await classifyWindow();
  const enteredNewMode = windowMode !== lastWindowMode;

  if (enteredNewMode) {
    tracker.stop();
    tracker.track(windowMode);
  }

  if (lastWindowMode !== Mode.Development && windowMode === Mode.Development) {
    lastWindowMode = windowMode as string;
  } else if (lastWindowMode !== "System") {
    lastWindowMode = windowMode as string;
  }

  const appropriateWindowType = await determineAppropriateWindowType();
  if (appropriateWindowType) showWindow(appropriateWindowType);

  openingWindow = false;
};

export async function determineAppropriateWindowType() {
  const isBreakTime = checkBreakTime(new Date());
  const distracted = await isDistracted();
  const mode = getLastGoal()?.mode;
  console.log({ mode });

  if (isBreakTime) {
    return "break";
  } else if (mode === Mode.Offline) {
    return "break";
  } else if (distracted) {
    return "distracted";
  }

  if (mode === Mode.Development) {
    if (tracker.getTime("development") > EIGHT_HOURS_IN_SECONDS) return "break";
  } else if (mode === "Study") {
    if (tracker.getTime("study") > ONE_HOUR_IN_SECONDS) return "break";
  }

  checkBreakTime(new Date());
}

export async function showWindow(type?: string) {
  tracker?.stop?.();
  try {
    // await refreshTokens();

    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.isFullScreen() || mainWindow.setFullScreen(true);
      mainWindow.isFocused() || mainWindow.focus();

      if (isProd) {
        mainWindow.isAlwaysOnTop() ||
          mainWindow.setAlwaysOnTop(true, "screen-saver");
      }
      return;
    }

    mainWindow = createWindow();

    initMenu(mainWindow);
    loadWindow(type);
  } catch (_) {
    console.log(_)
    console.log('lllllllllllllllllllloooooooooooooooooollllllllllllllllllllllllllll')
    createAuthWindow();
  }
}

export const loadWindow = async (type: string) => {
  if (isProd) {
    if (type === "break") {
      return mainWindow.loadURL("app://./home.html");
    } else if (type === "distracted") {
      return mainWindow.loadURL("app://./distracted.html");
    } else {
      await mainWindow.loadURL("app://./home.html");
    }
  } else {
    const baseUrl = `http://localhost:${port}`;

    if (type === "break") {
      return mainWindow.loadURL(baseUrl + "/home");
    } else if (type === "distracted") {
      return mainWindow.loadURL(baseUrl + "/distracted");
    } else {
      return mainWindow.loadURL(baseUrl + "/home");
    }
  }
};

export function checkBreakTime(timestamp: Date) {
  // Make everything past the 50 minute mark a break time
  if (timestamp.getMinutes() >= 50) {
    return true;
  }

  return false;
}
