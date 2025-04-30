import { styled } from "../../stitches.config";

const Item = styled("div", {
  cursor: "pointer",
  boxSizing: "border-box",
  transition: "color 0.5s ease-in-out",
  borderRadius: "5rem",
  padding: "0.93rem 1.625rem",
  display: "flex",
  justifyContent: "flex-start",
  flexFlow: "row",
  gap: "0.68rem",

  "&:hover": {},

  "> span": {
    height: "0.875rem",
  },

  variants: {
    state: {
      default: {
        color: "$text1 !important",
      },
      active: {
        backgroundColor: "$tabActiveBackground",
      },
    },
    color: {
      default: {
        color: "$text",
      },
      red: {
        color: "#dc2626",
      },
      yellow: {
        color: "#f9c851",
      },
      green: {
        color: "#22c55e",
      },
      purple: {
        color: "#9333ea",
      },
      blue: {
        color: "#3b82f6",
      },
    },
  },
});

type Props = {
  selected: string;
  name: string;

  displayName: string;
  onClick: (name: string) => void;
  icon: JSX.Element;
  style?: React.CSSProperties;
  color?: "yellow" | "blue" | "green" | "red" | "purple";
};

export default function TabSwitcherItem({
  selected,
  name,
  displayName,
  onClick,
  icon,
  style,
  color,
}: Props) {
  const handleClick = () => {
    onClick(name);
  };

  return (
    <Item
      onClick={handleClick}
      state={selected === name ? "active" : "default"}
      style={style}
      color={color || null}
    >
      {icon}
      <span>{displayName}</span>
    </Item>
  );
}
