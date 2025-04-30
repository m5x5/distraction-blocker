import { mutate } from "swr";
import { DraftGoal, GoalType } from "../../types/goals";
import { getHeaders } from "../../utils/api";

const API =
  process.env.LEPTUM_API || "http://localhost:3000";
const ENDPOINT = `${API}/goals`;

export const resortGoals = async (
  goals: GoalType[]
): Promise<Response | undefined> => {
  if (goals.length < 2) return;
  const headers = await getHeaders();

  await fetch(ENDPOINT + "/resort", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(goals),
  });

  mutate("/goals", goals);
};

export const addGoal = async (): Promise<Response> => {
  const headers = await getHeaders();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      name: "New Goal",
      type: "61a387f88b434b055d8c3264",
    }),
  });

  mutate("/goals");
  return res.json();
};

export const createGoal = async (goal: DraftGoal) => {
  const headers = await getHeaders();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      ...goal,
      type: "61a387f88b434b055d8c3264",
    }),
  });

  mutate("/goals");
  return res.json();
};

export const deleteGoal = async (
  id: string,
  goals: GoalType[]
): Promise<Response> => {
  const headers = await getHeaders();
  const res = await fetch(ENDPOINT + `/${id}`, {
    method: "DELETE",
    headers,
  });

  mutate("/goals", goals, false);
  return res.json();
};

export const updateGoal = async (goal: DraftGoal): Promise<void> => {
  const goalId = goal.id;
  delete goal.id;

  const headers = await getHeaders();
  await fetch(ENDPOINT + `/${goalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(goal),
  });

  mutate("/goals");
};

export const moveGoalToTop = async (id: string): Promise<void> => {
  const headers = await getHeaders();
  const res = await fetch(ENDPOINT + `/move/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      index: 0,
    }),
  });

  mutate("/goals", await res.json());
};

export const moveGoalTo = async (
  goalId: string,
  index: number
): Promise<void> => {
  const headers = await getHeaders();
  await fetch(ENDPOINT + `/move/${goalId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      index,
    }),
  });
};

export const removeDuplicates = async (): Promise<void> => {
  const res = await fetch(ENDPOINT + "/remove-duplicates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  mutate("/goals", await res.json());
};
