import { createContext, useContext } from "react";

type ContextProps = {};

const HabitsContext = createContext<ContextProps>(null);

export function useHabitsContext() {
  return useContext(HabitsContext);
}

export function HabitsContextProvider({ children }) {
  return <HabitsContext.Provider value={{}}>{children}</HabitsContext.Provider>;
}
