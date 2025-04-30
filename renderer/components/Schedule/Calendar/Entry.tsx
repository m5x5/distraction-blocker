import { styled } from "../../../stitches.config";

const Container = styled("div", {
  display: "flex",
  padding: "0.5rem",
  borderRadius: "$1",

  variants: {
    color: {
      red: {
        backgroundColor: "#dc2626",
      },
      yellow: {
        backgroundColor: "#facc15",
      },
      green: {
        backgroundColor: "#22c55e",
      },
      purple: {
        backgroundColor: "#9333ea",
      },
      blue: {
        backgroundColor: "#3b82f6",
      },
    },
  },
  defaultVariants: {
    color: "purple",
  },
});

const Title = styled("h3", {});

type Props = {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
};

function CalendarEntry({ children, title }: Props) {
  return <Container title={title}>{children}</Container>;
}

type TitleProps = {
  children: string;
};

function TitleElement({ children }: TitleProps) {
  return <Title>{children}</Title>;
}

CalendarEntry.Title = TitleElement;
export default CalendarEntry;
