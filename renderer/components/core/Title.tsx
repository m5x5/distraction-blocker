import { styled } from "../../stitches.config";

const Title = styled("h1", {
  color: "$text",
  fontSize: "1.125rem",
  fontWeight: "500",

  variants: {
    size: {
      1: {
        fontSize: "1.5rem",
      },
      2: {
        fontSize: "1.25rem",
      },
      3: {
        fontSize: "1.125rem",
      },
    },
  },

  defaultVariants: {
    size: "3",
  },
});

export default Title;
