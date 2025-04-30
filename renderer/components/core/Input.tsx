import { lightTheme, styled } from "../../stitches.config";

const Input = styled("input", {
  appearance: "none",
  backgroundColor: "$inputColor",
  border: "none",
  boxShadow: "none",
  color: "$text",
  fontFamily: "$font",
  fontSize: "1rem",
  fontWeight: "normal",
  width: "100%",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  marginBottom: "0.5rem",

  [`.${lightTheme} &`]: {
    border: "$borderColor 2px solid",
  },

  "&:focus": {
    outline: "none",
    backgroundColor: "$gray600",

    // Keep same background color in white theme
    [`.${lightTheme} &`]: {
      backgroundColor: "$inputColor",
    },
  },

  variants: {
    shape: {
      round: {
        borderRadius: "5rem",
        fontSize: "0.875rem",
        padding: "0.9rem 1.5rem",
      },
    },
    margin: {
      none: {
        marginBottom: "0",
      },
    },
  },
});

export default Input;
