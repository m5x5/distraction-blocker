import { styled } from "../../stitches.config";
import { DedicationsProvider } from "./Context";
import DedicationsHead from "./Header";
import DedicationsList from "./List";

const Container = styled("div", {
  padding: "1rem 2rem",
  maxHeight: "94.5vh",
  overflow: "auto",
});

export default function DedicationsContainer() {
  return (
    <DedicationsProvider>
      <Container>
        <DedicationsHead />
        <DedicationsList />
      </Container>
    </DedicationsProvider>
  );
}
