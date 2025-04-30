import prettyMs from "pretty-ms";
import { styled } from "../../stitches.config";

const Bar = styled("progress", {
  width: "100%",
  backgroundColor: "$gray900",
  height: "0.6rem",
  "-webkit-appearance": "none",
  appearance: "none",
  borderRadius: "0.25rem",

  "&::-webkit-progress-bar": {
    // fill: "#16a34a",
    backgroundColor: "$gray900",
    borderRadius: "0.25rem",
    overflow: "hidden",
  },

  "&::-webkit-progress-value": {
    backgroundColor: "#16a34a",
    borderRadius: "0.25rem",
  },
  variants: {
    color: {
      default: {
        "&::-webkit-progress-value": {
          backgroundColor: "#16a34a",
        },
      },
      green: {
        "&::-webkit-progress-value": {
          backgroundColor: "#16a34a",
        },
      },
      red: {
        "&::-webkit-progress-value": {
          backgroundColor: "#dc2626",
        },
      },
    },
  },
});

type Props = {
  time: number;
  color?: "green" | "red";
};

export default function Progress({ time, color }: Props) {
  const EIGHT_HOURS_IN_MS = 1000 * 60 * 60 * 8;

  return (
    <Bar
      value={time}
      max={EIGHT_HOURS_IN_MS}
      title={prettyMs(time)}
      color={color}
    />
  );
}
