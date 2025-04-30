import AutoLaunch from "auto-launch";
import { app, globalShortcut } from "electron";
import serve from "electron-serve";
import "./helpers/goals";
import "./helpers/ipc";
import { initTimeIpc } from "./helpers/ipc";
import log from "./helpers/logger";
import { isProd } from "./helpers/process";
import tracker from "./helpers/time-tracker";
import registerTasks from "./services/cron-tasks";
import { showWindow, showWindowIfNeeded } from "./services/window";

require("dotenv").config();
initTimeIpc(tracker);

log.log("Leptum Desktop Blocker is starting");

if (!isProd) {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
} else {
  serve({ directory: "app" });
}

(async () => {
  await app.whenReady();
  registerTasks();
  showWindow();

  if (isProd) {
    setInterval(async () => {
      showWindowIfNeeded();
    }, 1000 * 7);
  } else {
    setInterval(async () => {
      showWindowIfNeeded();
    }, 1000 * 7);
  }
})();

// if (isProd) {
  app.on("window-all-closed", (e: Event) => {
    e.preventDefault();
    showWindowIfNeeded();
  });

  app.on("ready", async () => {
    log.info("Enable application auto start");
    let autoLaunch = new AutoLaunch({
      name: "Leptum Blocker",
      path: app.getPath("exe"),
    });

    const isEnabled = await autoLaunch.isEnabled();
    if (!isEnabled) await autoLaunch.enable();

    log.info("Setting up Leptum shortcut");
    globalShortcut.register("Ctrl+shift+l", () => showWindow());
  });
// }
