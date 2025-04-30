import { PlusIcon } from "@heroicons/react/solid";
import { styled } from "../../../stitches.config";
import { createHabit } from "../api";
import HabitListItem from "./Item";

const Container = styled("div", {
  display: "flex",
  flexFlow: "column",
  gap: ".5rem",
  padding: "0rem 1rem",
});

const MockHabitItem = styled("div", {
  display: "grid",
  placeContent: "center",
  height: "2rem",
  width: "100%",
  opacity: "0.4",
  backgroundColor: "$gray800",
  borderRadius: "0.5rem",
  transition: "opacity 0.6s ease-in-out",
  cursor: "pointer",

  "> svg": {
    height: "1.5rem",
  },

  "&:hover": {
    opacity: 0.6,
  },
});

export default function HabitList({ routine }) {
  const { habits, id } = routine || {};
  const onCreate = () => {
    createHabit({
      name: "New Habit",
      jobId: id,
    });
  };

  return (
    <Container>
      {habits?.map((item) => (
        <HabitListItem key={item.id} habit={item} />
      ))}
      <MockHabitItem onClick={onCreate}>
        <PlusIcon />
      </MockHabitItem>
    </Container>
  );
}
