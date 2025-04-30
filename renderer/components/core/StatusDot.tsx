import { styled } from "../../stitches.config";

const Dot = styled("div", {
  borderRadius: "50%",
  width: ".7rem",
  height: ".7rem",
  backgroundColor: "$gray800",
  marginRight: "0.5rem",
  variants: {
    status: {
      default: {
        backgroundColor: "$text",
      },
      completed: {
        backgroundColor: "#22c55e",
      },
      pending: {
        backgroundColor: "#3b82f6",
      },
      scheduled: {
        // Orange
        backgroundColor: "#facc15",
      },
      due: {
        backgroundColor: "#3b82f6",
      },
    },
  },
});

type Props = {
  status: "pending" | "completed";
  title?: string;
};

export default function StatusDot({ status, title }: Props) {
  return <Dot status={status || "default"} title={title} />;
}
