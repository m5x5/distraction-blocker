import { classifyWindow } from "../services/window/classify";
import { getLastGoal, Mode } from "./goals";

let enforcedMode:
  | undefined
  | "Development"
  | "Entertainment"
  | "Study"
  | "System"
  | "Offline";

setInterval(() => {
  const goal = getLastGoal();
  if (!goal) return;

  const sep = JSON.parse(JSON.stringify(goal));
  enforcedMode = sep.mode;
}, 1000);

export const isDistracted = async () => {
  const { title: windowTitle, mode: actualMode } = await classifyWindow();
  if (actualMode === Mode.Entertainment || windowTitle === Mode.Development) {
    return true;
  }

  if (enforcedMode === Mode.Study && actualMode === Mode.Development) {
    return true;
  }

  if (enforcedMode === Mode.Offline && actualMode !== Mode.System) {
    return true;
  }
};

export const shouldBeOffline = async () => {
  return enforcedMode === "Offline";
};
