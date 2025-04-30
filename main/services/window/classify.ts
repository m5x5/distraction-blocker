import dotenv from "dotenv";
import activeWindow from "electron-active-window";
import log from "electron-log";
import fetch from "node-fetch";
import { leptumApi } from "../../helpers/api";

dotenv.config();

type Mode = "Development" | "Study" | "System" | "Entertainment";
type Classification = { title: string; mode: Mode };

export async function classifyWindow(): Promise<Classification> {
  const title = (await activeWindow().getActiveWindow()).windowName;

  log.info(`Classifying window: "${title}"`);
  const classification = await requestClassification(title);
  log.info(`Classified window: ${title} as "${classification}"`);
  return { title, mode: classification };
}

export async function requestClassification(title: string): Promise<Mode> {
  const data = await fetch(leptumApi + "/classifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      string: title,
    }),
  }).catch(() => {
    log.error(`Error requesting classification for ${title}`);
    return null;
  });

  return data?.text?.();
}
