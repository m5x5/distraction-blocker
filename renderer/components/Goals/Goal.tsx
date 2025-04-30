import { XIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Menu, useContextMenu } from "react-contexify";
import {
  DetailsContextType,
  useDetailsContext,
} from "../../context/DetailsContext";
import { useGoalsContext } from "../../context/GoalsContext";
import { LockContextType, useLockContext } from "../../context/LockContext";
import { styled } from "../../stitches.config";
import { GoalType } from "../../types/goals";
import Input from "../core/Input";
import Label from "../core/Label";
import { moveGoalToTop, updateGoal } from "./api";
import SelectMode from "./GoalItem/SelectMode";

type GoalProps = {
  goal: GoalType;
  index: number;
};

const Container = styled("div", {
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateColumns: "1fr auto auto auto",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "0.875rem",
  backgroundColor: "$cardBackground",
  padding: "1.125rem 1.5rem",
  userSelect: "none",
  fontWeight: "500",

  ">.goal-name": {
    fontSize: "0.875rem",
    color: "$text",
  },

  ">.separator": {
    display: "inline-block",
    width: "2px",
    height: "100%",
    background: "$borderColor",
    borderRadius: "1px",
  },
});

const Item = styled("span", {
  fontSize: "0.9rem",
  width: "100%",
  padding: "0.3rem 0.8rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "$gray300",

  "&:hover": {
    backgroundColor: "$gray700",
  },
});

const Tag = styled("div", {
  fontSize: "0.8rem",
  fontWeight: "normal",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  display: "flex",
  alignItems: "center",

  "&::before": {
    content: '""',
    display: "inline-block",
    backgroundColor: "$blue",
    width: "0.25rem",
    height: "0.25rem",
    borderRadius: "50%",
    marginRight: "0.5rem",
  },

  variants: {
    type: {
      Development: {
        backgroundColor: "$blueTint",
        color: "$blue",

        "&::before": {
          backgroundColor: "$blue",
        },
      },
      Offline: {
        backgroundColor: "$redTint",
        color: "$red",

        "&::before": {
          backgroundColor: "$red",
        },
      },
    },
  },

  defaultVariants: {
    type: "Development",
  },
});

export default function Goal(props: GoalProps) {
  const MENU_ID = "goal-menu-" + props.goal.id;
  const { setElement } = useDetailsContext() as DetailsContextType;
  const { isLocked } = useLockContext() as LockContextType;
  const { deleteGoal } = useGoalsContext();
  const { goal, index } = props;
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleDelete = () => deleteGoal?.(goal.id);
  const onClick = () => {
    setElement(<EditForm goal={goal} />);
  };

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    show(event, {
      props: {
        key: "value",
      },
    });
  };

  const moveToTop = () => {
    if (isLocked) return;
    moveGoalToTop(goal.id);
  };

  const modes = ["Development", "Offline"];
  // TODO: Make sure modes are consistent and fix forced type casting
  // Select a color mode if the current mode has no color
  const mode : 'Development' | 'Offline' = (modes.includes(goal.mode) ? goal.mode : modes[0]) as 'Development';

  return (
    <Draggable draggableId={goal.id} index={index} isDragDisabled={isLocked}>
      {(provided, _snapshot) => (
        <Container
          className="group"
          ref={provided.innerRef}
          onContextMenu={handleContextMenu}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="goal-name" onClick={onClick}>
            {goal.name}
          </p>
          <Tag type={mode}>{goal.mode}</Tag>
          <span className="separator" />
          <XIcon
            className="h-6 text-gray-700 hover:text-red-500 group-hover:text-gray-500"
            onClick={handleDelete}
          />
          <Menu id={MENU_ID} style={{ background: "#1F2937" }}>
            <Item onClick={handleDelete}>Delete Goal</Item>
            {isLocked ? null : <Item onClick={moveToTop}>Move to top</Item>}
          </Menu>
        </Container>
      )}
    </Draggable>
  );
}

function EditForm({ goal }: any) {
  let [name, setName] = useState(goal.name);
  let [dueDate, setDueDate] = useState(goal.dueDate);

  function handleSubmit(e: any) {
    e.preventDefault();
    updateGoal({ ...goal, name, dueDate });
  }

  const onChangeDate = (e: any) => {
    let date = e.target.value;

    if (!date) return setDueDate(null);
    date = new Date(date);

    date = dayjs(date).format("YYYY-MM-DDTHH:mm");

    setDueDate(date);
  };

  useEffect(() => {
    setName(goal.name);
  }, [goal.name]);

  useEffect(() => {
    setDueDate(goal.dueDate);
  }, [goal.dueDate]);

  return (
    <>
      <h1>Edit Goal</h1>
      <form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input
          title="Name"
          placeholder="Name"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Mode</Label>
        <SelectMode goal={goal} />
        <br />
        <br />
        <Label>Due Date</Label>
        <Input
          title="Due Date"
          placeholder="Due Date"
          type="datetime-local"
          value={dueDate || ""}
          onChange={onChangeDate}
        />
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-100 bg-blue-700 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-blue-500"
        >
          Save
        </button>
      </form>
    </>
  );
}
