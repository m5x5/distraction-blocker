import { ipcMain, IpcMainInvokeEvent } from "electron";
import { getAccessToken, getProfile } from "../../services/auth-service";
import { TimeTracker } from "./time-tracker";

ipcMain.handle("getProfile", () => {
  return getProfile();
});

ipcMain.handle("getAccessToken", () => {
  const accessToken = getAccessToken();
  return accessToken;
});

export const initTimeIpc = (tracker: TimeTracker) => {
  ipcMain.handle(
    "getTime",
    async (_event: IpcMainInvokeEvent, mode: string) => {
      if (typeof mode !== "string") return;
      const time = tracker.getTime(mode);
      return time;
    }
  );
  ipcMain.handle(
    "getWeeklySummary",
    async (_event: IpcMainInvokeEvent, mode: string) => {
      if (typeof mode !== "string") return;
      const time = tracker.getWeeklySummary(mode);
      return time;
    }
  );
};
