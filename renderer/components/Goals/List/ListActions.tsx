import { styled } from "../../../stitches.config";
import Button from "../../core/Button";
import Input from "../../core/Input";
import Title from "../../core/Title";
import { addGoal } from "../api";

const Container = styled("div", {
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "3.25rem",
});

export default function ListActions({ onChangeFilter, filterValue }) {
  const onClick = () => {
    addGoal();
  };

  return (
    <Container>
      <Title size="1">Tasks</Title>
      <Input
        placeholder="Search"
        style={{ width: "min-content" }}
        shape="round"
        margin="none"
        value={filterValue}
        onChange={onChangeFilter}
      />
      <Button onClick={onClick} shape="round" color="blue" shadow="blue">
        New Task
      </Button>
    </Container>
  );
}
