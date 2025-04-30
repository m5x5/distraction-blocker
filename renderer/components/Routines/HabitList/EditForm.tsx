import { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import Button from "../../core/Button";
import Input from "../../core/Input";
import Label from "../../core/Label";
import { updateRoutine } from "../api";

const Title = styled("h2", {
  fontFamily: "$sans",
  fontSize: "1.2rem",
  fontWeight: "normal",
  padding: "0",
  margin: "0",
  lineHeight: "1",
});

export default function EditForm({ habit }) {
  const [name, setName] = useState(habit.name);
  const [cron, setCron] = useState(habit.cron);

  useEffect(() => {
    setName(habit.name);
    setCron(habit.cron);
  }, [habit]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeCron = (e) => {
    setCron(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateRoutine(habit.id, { name, cron });
  };

  return (
    <form onSubmit={onSubmit}>
      <Title>Edit Routine</Title>
      <Label>Name</Label>
      <Input value={name} onChange={onChangeName} />
      <Label>Cron</Label>
      <Input value={cron} onChange={onChangeCron} />
      <Button type="submit">Save</Button>
    </form>
  );
}
