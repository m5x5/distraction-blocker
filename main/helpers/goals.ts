import fetch from "node-fetch";
import { getHeaders } from "../../services/auth-service";
import log from "./logger";
require("dotenv").config();

const API =
  process.env.LEPTUM_API || "http://localhost:3000";

export enum Mode {
  Development = "Development",
  Entertainment = "Entertainment",
  Study = "Study",
  Offline = "Offline",
  System = "System",
}

type Goal = {
  name: string;
  index: number;
  type: string;
  id: string;
  mode:
    | Mode.Development
    | Mode.Entertainment
    | Mode.Study
    | Mode.Offline
    | Mode.System;
};

const Goal = {};
let lastGoal: undefined | Goal;
let isSending = false;

setInterval(async () => {
  if (isSending) return;

  try {
    const headers = getHeaders();
    isSending = true;

    const res = await fetch(API + "/goals/first", { headers });
    if (!res?.ok) throw new Error();

    lastGoal = await res.json();
  } catch (error) {
    log.error(error)
    log.error("Error fetching goals");
  } finally {
    isSending = false;
  }
}, 5000);

export const getLastGoal = () => lastGoal;
