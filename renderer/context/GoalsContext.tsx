import dotenv from "dotenv";
import { createContext, useContext } from "react";
import useSWR from "swr";
import { deleteGoal } from "../components/Goals/api";
import { GoalType } from "../types/goals";
import { getHeaders } from "../utils/api";
dotenv.config();

type ContextProps = {
  goals: GoalType[];
  deleteGoal?: (id: string) => Promise<void>;
};

const GoalsContext = createContext<ContextProps>({
  goals: [],
});

export function useGoalsContext() {
  return useContext(GoalsContext);
}

const API =
  process.env.LEPTUM_API || "http://localhost:3000";
const fetcher = async (url: string) => {
  const headers = await getHeaders();
  return fetch(API + url, { headers }).then((res) => res.json());
};

export function GoalsContextProvider({ children }) {
  let { data: goals } = useSWR<GoalType[]>("/goals", fetcher, {
    refreshInterval: 10000,
  });
  goals = goals || [];

  const handleDelete = async (id: string) => {
    if (!goals) return;
    const index = goals.findIndex((g: GoalType) => g.id === id);

    if (index !== -1) {
      goals = goals.filter((g: GoalType) => g.id !== id);

      await deleteGoal(id, goals);
    }
  };

  return (
    <GoalsContext.Provider value={{ goals, deleteGoal: handleDelete }}>
      {children}
    </GoalsContext.Provider>
  );
}
