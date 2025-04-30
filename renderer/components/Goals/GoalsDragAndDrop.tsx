import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useGoalsContext } from "../../context/GoalsContext";
import { styled } from "../../stitches.config";
import { moveGoalTo } from "./api";
import GoalList from "./List";

const Container = styled("div", {
  padding: "1rem 2rem",
  color: "$text1",
});

export default function GoalsDragAndDrop() {
  let { goals } = useGoalsContext();
  goals = goals || [];

  const handleDragEnd = (
    { destination, draggableId }: DropResult,
    _provided: ResponderProvided
  ) => {
    if (!destination) return;
    // Remove the draggable from the list
    const copy = goals.find((goal) => goal.id === draggableId);
    if (!copy) return;

    // Create new list to put item into
    const newGoals = goals.filter((goal) => goal.id !== draggableId);
    newGoals.splice(destination.index, 0, copy);

    goals = newGoals;

    moveGoalTo(draggableId, destination.index);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <Container className="flex flex-col gap-3" ref={provided.innerRef}>
              <GoalList
                droppableProps={provided.droppableProps}
                goals={goals}
              />
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
