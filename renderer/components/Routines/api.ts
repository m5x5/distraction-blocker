import { mutate } from "swr";
import { getHeaders } from "../../utils/api";

export type Job = {
  id: string;
  status: string;
  cron: string;
  lastEndTime?: number;
  name?: string;
  index: number;
  habits: Habit[];
};

export type DraftJob = {
  cron?: string;
  name?: string;
};

export type CreateRoutineDto = {
  name: string;
  cron: string;
  lastEndTime?: string;
  status: "pending" | "scheduled" | "due";
};

export type CreateHabitDto = {
  name: string;
  jobId: string;
  description?: string;
  status?: "pending" | "scheduled" | "due";
};

export type UpdateHabitDto = {
  id: string;
  name?: string;
  description?: string;
  status?: "pending" | "scheduled" | "due";
};

export type Habit = {
  id: string;
  name: string;
  jobId: string;
  index: number;
  status: string;
  description?: string;
};

const API =
  process.env.LEPTUM_API || "http://localhost:3000";
const ENDPOINT = API + "/jobs";

export async function getJobs(): Promise<Job[]> {
  const headers = await getHeaders();
  const jobs = (await (await fetch(ENDPOINT, { headers })).json()) as Job[];

  return jobs;
}

export async function deleteRoutine(id: string): Promise<void> {
  const headers = await getHeaders();
  await fetch(ENDPOINT + "/" + id, {
    method: "DELETE",
    headers,
  });
  mutate("/jobs");
}

export async function updateRoutine(id: string, data: DraftJob): Promise<void> {
  const headers = await getHeaders();
  await fetch(ENDPOINT + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });

  mutate("/jobs");
}

export async function createRoutine(data: CreateRoutineDto): Promise<void> {
  const headers = await getHeaders();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });

  console.log(res, await res.json());

  mutate("/jobs");
}

export async function createHabit(data: CreateHabitDto): Promise<void> {
  const headers = await getHeaders();
  const res = await fetch(API + "/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error(await res.json());
  }

  mutate("/jobs");
}

export async function updateHabit(habit: UpdateHabitDto): Promise<void> {
  const headers = await getHeaders();
  const res = await fetch(API + "/habits/" + habit.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },

    body: JSON.stringify(habit),
  });

  if (!res.ok) {
    console.error(await res.json());
  }

  mutate("/jobs");
}

export async function completeHabit(habitId: string): Promise<Habit> {
  const headers = await getHeaders();
  const res = await fetch(API + `/habits/complete/${habitId}`, {
    method: "POST",
    ...headers,
  });
  mutate(ENDPOINT);

  return res.json();
}

export async function unlockJob({ id }: { id: string }): Promise<Job> {
  const headers = await getHeaders();
  const res = await fetch(ENDPOINT + `/unlock/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  mutate(ENDPOINT);

  return res.json();
}
