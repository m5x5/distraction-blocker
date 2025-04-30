import { useEffect, useState } from "react";
import { useDetailsContext } from "../../../context/DetailsContext";
import { styled } from "../../../stitches.config";
import Button from "../../core/Button";
import Input from "../../core/Input";
import Label from "../../core/Label";
import { updateHabit } from "../api";

const Container = styled("div", {
  backgroundColor: "$cardBackground",
  color: "$text",
  padding: "0.3rem 0.8rem",
  borderRadius: "0.5rem",
});

const Title = styled("h3", {});

const Text = styled("p", {
  fontSize: "0.8rem",
  color: "$text1",
});

export default function HabitListItem({ habit }) {
  const { setElement } = useDetailsContext();
  const updateHabit = () => {
    setElement(<HabitForm habit={habit} />);
  };

  return (
    <Container onClick={updateHabit}>
      <Title>{habit.name}</Title>
      <Text>{habit.description}</Text>
    </Container>
  );
}

function HabitForm({ habit }) {
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setState({
      name: habit.name,
      description: habit.description || "",
    });
  }, [habit]);

  const onChange = (propName) => (e) => {
    setState({
      ...state,
      [propName]: e.target.value,
    });
  };

  const onUpdate = () => {
    updateHabit({
      id: habit.id,
      ...state,
    });
  };

  return (
    <div>
      <h1>Habit Form</h1>
      <Label>Name</Label>
      <Input value={state.name} onChange={onChange("name")} />
      <Label>Description</Label>
      <Input
        value={state.description}
        onChange={onChange("description")}
        placeholder="Description"
      />
      <Button onClick={onUpdate}>Submit</Button>
    </div>
  );
}
