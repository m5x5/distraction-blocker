import { styled } from "../../stitches.config";

const Container = styled("select", {
  padding: "0.3rem 1.6rem 0.3rem 0.9rem",
  outline: "none",
  borderRadius: "0.5rem",
  color: "white",
  background: "$gray700",
  appearance: "none",
  backgroundImage: "url(/chevron-down.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.5rem center",
  backgroundSize: "1.2rem",
  fontSize: "1rem",
  "&:active": {
    background: "gray800",
  },
});

export default function Select({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}
