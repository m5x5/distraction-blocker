export type GoalType = {
  id: string;
  name: string;
  type: string;
  mode: "Development" | "Study" | "Entertainment";
  index: number;
  description?: string;
  next?: string;
};

export type DraftGoal = {
  id?: string;
  name?: string;
  type?: string;
  mode?: "Development" | "Study" | "Entertainment" | "Offline";
  index?: number;
};
