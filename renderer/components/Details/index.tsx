import { useDetailsContext } from "../../context/DetailsContext";
import { styled } from "../../stitches.config";
import Clock from "../Clock";
import Button from "../core/Button";
import Profile from "./Profile";
import ThemeButton from "./ThemeButton";
import Timer from "./Timer";

const Container = styled("div", {
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  gap: ".5rem",
  padding: "1rem",
  backgroundColor: "$cardBackground",
});

const Top = styled("div", {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  placeItems: "center",
  justifyContent: "space-between",
  flexFlow: "row",
  marginBottom: "3.69rem",
  width: "82%",
});

export default function DetailsView() {
  const { setEditing, element, editing } = useDetailsContext();

  const onBack = () => {
    setEditing(false);
  };

  return (
    <Container>
      <Top>
        <ThemeButton />
        <Profile />
      </Top>
      <Clock />
      {editing ? (
        <>
          {element}
          <Button onClick={onBack}>Back</Button>
        </>
      ) : null}
      {!editing && <Timer />}
    </Container>
  );
}
