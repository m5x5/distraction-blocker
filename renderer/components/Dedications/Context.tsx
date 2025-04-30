import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { createDedication, editDedication } from "./api";
import { Context, ContextProps, Dedication, Fetcher } from "./typings";
const DedicationsContext = createContext<ContextProps>(null);

export function useDedicationsContext() {
  return useContext(DedicationsContext);
}

const API =
  process.env.LEPTUM_API || "http://localhost:3000";
const fetcher: Fetcher = (url: RequestInfo) =>
  fetch(API + url).then((r) => r.json());

export function DedicationsProvider({ children }) {
  const { data } = useSWR("/dedications", fetcher);
  let dedications: Dedication[] = data || [];

  // Initialize dedications with an empty array if it's not set
  const [state, setState] = useState<Context>({
    dedications: dedications || [],
    HOURS_IN_WEEK: 168,
    showAddModal: false,
    showEditModal: false,
  });

  // Update the dedications when the data changes
  useEffect(() => {
    setState((state) => ({
      ...state,
      dedications,
    }));
  }, [JSON.stringify(dedications)]);

  let timeLeft: number = state.HOURS_IN_WEEK;

  if (state.dedications?.length) {
    timeLeft =
      state.HOURS_IN_WEEK -
      state.dedications.reduce(
        (acc, { hours, quantity }) => acc + hours * quantity,
        0
      );
  }

  const handleSetDedications: ContextProps["setDedications"] = (
    dedications
  ) => {
    setState({ ...state, dedications });
  };

  const handleCreateDedication: ContextProps["createDedication"] = async (
    draftDedication
  ) => {
    const dedication = await createDedication(draftDedication);
    const dedications = [...state.dedications, dedication];

    setState({ ...state, dedications });

    return dedication;
  };

  const handleEditDedication: ContextProps["editDedication"] = async (
    id,
    draftDedication
  ) => {
    const dedication = await editDedication(id, draftDedication);
    const dedications = state.dedications.map((d) =>
      d.id === id ? { ...d, ...dedication } : d
    );

    setState({ ...state, dedications });
    return dedication;
  };

  const setShowAddModal: ContextProps["setShowAddModal"] = (showAddModal) => {
    setState({ ...state, showAddModal });
  };

  const setShowEditModal: ContextProps["setShowEditModal"] = (
    showEditModal
  ) => {
    setState({ ...state, showEditModal });
  };

  return (
    <DedicationsContext.Provider
      value={{
        setDedications: handleSetDedications,
        createDedication: handleCreateDedication,
        editDedication: handleEditDedication,
        setShowAddModal,
        setShowEditModal,
        timeLeft,
        ...state,
      }}
    >
      {children}
    </DedicationsContext.Provider>
  );
}
