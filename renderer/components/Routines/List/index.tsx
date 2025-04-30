import { PlusIcon } from "@heroicons/react/solid";
import { useDetailsContext } from "../../../context/DetailsContext";
import { styled } from "../../../stitches.config";
import { createRoutine } from "../api";
import EditForm from "../HabitList/EditForm";
import RoutineItem from "./RoutineItem";

const Container = styled("div", {
  display: "grid",
  gridAutoFlow: "row",
  gap: "0.5rem",
  gridTemplateColumns: "1fr 1fr",
  gridAutoRows: "1fr",
  padding: "1rem",
});

const MockRoutineItem = styled("div", {
  backgroundColor: "$cardBackground",
  color: "$text",
  borderRadius: "0.5rem",
  display: "grid",
  opacity: 0.4,
  placeItems: "center",
  transition: "opacity 0.6s ease-in-out",
  cursor: "pointer",
  "> svg": {
    height: "1.5rem",
  },
  "&:hover": {
    opacity: 0.6,
  },
});

type Props = {
  items: any[];
  title?: string;
  onSelect: (item: any) => void;
};

export default function RoutineList({ items, onSelect }: Props) {
  const { setElement } = useDetailsContext();
  const handleSelect = (item) => () => {
    onSelect(item.id);
    setElement(<EditForm habit={item} />);
  };

  const onCreate = () => {
    createRoutine({
      name: "New Routine",
      cron: "0 */1 * * *",
      status: "scheduled",
      lastEndTime: "" + Date.now(),
    });
  };

  return (
    <Container>
      {items?.map((item) => (
        <RoutineItem item={item} onClick={handleSelect(item)} key={item.id} />
      ))}
      <MockRoutineItem title="New Routine" onClick={onCreate}>
        <PlusIcon />
      </MockRoutineItem>
    </Container>
  );
}
