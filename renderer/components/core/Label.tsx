import { styled } from "../../stitches.config";

const Container = styled("label", {
  color: "$muted",
});

export default function Label({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}
