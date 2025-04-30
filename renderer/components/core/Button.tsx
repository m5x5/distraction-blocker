import { styled } from "../../stitches.config";

const Button = styled("button", {
  padding: "0.3rem 1rem",
  backgroundColor: "$gray600",
  borderRadius: "0.5rem",
  fontSize: "1rem",
  fontWeight: "normal",
  "&:focus": {
    outline: "none",
    backgroundColor: "$gray600",
  },
  variants: {
    shape: {
      round: {
        borderRadius: "5rem",
        fontSize: "0.875rem",
        padding: "1rem 2rem",
      },
    },
    color: {
      blue: {
        backgroundColor: "#4361EE",
      },
    },
    shadow: {
      blue: {
        boxShadow: "0 1rem 4rem rgba(67, 97, 238, 0.3)",
      },
    },
  },
});

export default Button;
