import { createContext, useContext, useState } from "react";
import Card from "../components/core/Card";
import { styled } from "../stitches.config";

export type DetailsContextType = {
  editing: boolean;
  setEditing: (editing: boolean) => void;
  element: React.ReactNode | React.ReactNode[] | null;
  setElement: (element: React.ReactNode | React.ReactNode[] | null) => void;
};

const DetailsContext = createContext<Partial<DetailsContextType>>({});
const Container = styled("div", {
  backgroundColor: "$gray900",
  padding: "2rem 2rem",
  borderRadius: "0.5rem",
  margin: "1rem 0",
  "> h1": {
    fontSize: "1.5rem",
    textAlign: "center",
  },
});

export function useDetailsContext() {
  const context = useContext(DetailsContext);

  return context;
}

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function DetailsContextProvider({ children }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [element, setElement] = useState<
    React.ReactNode | React.ReactNode[] | null
  >(null);
  const handleSetElement = (
    element: React.ReactNode | React.ReactNode[] | null
  ) => {
    setElement(element);
    setEditing(true);
  };

  const Element = <Card>{element}</Card>;

  return (
    <DetailsContext.Provider
      value={{
        editing,
        setEditing,
        element: Element,
        setElement: handleSetElement,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
}
