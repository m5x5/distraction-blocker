import { styled } from "../../stitches.config";

const Container = styled("div", {
  position: "fixed",
  top: "0",
  right: "0",
  backgroundColor: "$gray900",
  transform: "translate(40%, -70%) rotate(45deg)",
  transformOrigin: "top left",
  padding: "0 1.7rem",
});

export default function DevelopmentBadge() {
  return <Container>Development</Container>;
}
