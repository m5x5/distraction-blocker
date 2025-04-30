import { useEffect, useState } from "react";
import Select from "../../core/Select";
import { updateGoal } from "../api";

export default function SelectMode({ goal }) {
  const [mode, setMode] = useState(goal.mode);

  useEffect(() => {
    if (!goal.mode) return;

    setMode(goal.mode);
  }, [JSON.stringify(goal.mode)]);

  const onChange = (e) => {
    const newMode = e.target.value;

    updateGoal({ ...goal, mode: newMode });

    setMode(newMode);
  };

  return (
    <Select onChange={onChange} value={mode} title="Change Mode">
      <option value="Development">Development</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Study">Study</option>
      <option value="Offline">Offline</option>
    </Select>
  );
}
