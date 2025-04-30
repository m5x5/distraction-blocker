import { GoalsContextProvider } from "../../context/GoalsContext";
import GoalsDragAndDrop from "./GoalsDragAndDrop";

export default function GoalsView() {
  return (
    <GoalsContextProvider>
      <GoalsDragAndDrop />
    </GoalsContextProvider>
  );
}
