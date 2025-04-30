import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { DroppableProvided } from "react-beautiful-dnd";
import { styled } from "../../../stitches.config";
import { DraftGoal, GoalType } from "../../../types/goals";
import Text from "../../core/Text";
import Title from "../../core/Title";
import { createGoal } from "../api";
import Goal from "../Goal";
import LockButton from "../LockButton";
import CreateGoalModal from "../Modals/CreateGoalModal";
import ListActions from "./ListActions";
import ListPlaceholder from "./Placeholder";

type GoalListProps = {
  droppableProps: DroppableProvided["droppableProps"];
  goals: GoalType[];
};

const Top = styled("div", {
  borderRadius: "$2",
  display: "grid",

  "> input": {
    margin: "0",
  },
  "> a": {
    fontSize: "0.85rem",
    color: "$gray500",
    marginLeft: "0.5rem",
    cursor: "pointer",
    placeSelf: "start",
    "&:hover": {
      color: "$gray600",
    },
  },

  "> .greeting": {
    marginBottom: "2.56rem",
  },
});

export default function GoalList({ droppableProps, goals }: GoalListProps) {
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    ipcRenderer.on("create", () => setCreating(true));

    return () => {
      ipcRenderer.removeAllListeners("create");
    };
  }, []);

  const onSubmit = (goal: DraftGoal) => {
    createGoal(goal);
    setCreating(false);
  };

  const onClose = () => {
    setCreating(false);
  };

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Top>
        <Title>Good Morning, Michael</Title>
        <Text className="greeting">
          It’s a new day to achieve your goals 💪
        </Text>
        <ListActions filterValue={filter} onChangeFilter={onChangeFilter} />
      </Top>
      {goals?.[0] ? (
        goals
          .filter((goal) =>
            filter
              ? goal.name.toLowerCase().includes(filter.toLowerCase())
              : true
          )
          .map((goal, i) => (
            <Goal index={i} key={goal.id} goal={goal} {...droppableProps} />
          ))
      ) : (
        <ListPlaceholder isFetched={!!goals} />
      )}
      <LockButton />
      {creating && <CreateGoalModal onSubmit={onSubmit} onClose={onClose} />}
    </>
  );
}
