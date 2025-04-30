import cron from "node-cron";
import { sendNotification } from "./notifications";

export default function registerTasks() {
  cron.schedule("*/15 * * * *", () => {
    sendNotification("posture-alert");
  });
}
