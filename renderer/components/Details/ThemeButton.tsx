import { useTheme } from "next-themes";
import { styled } from "../../stitches.config";
import DarkModeIcon from "../core/icons/DarkMode";
import LightModeIcon from "../core/icons/LightMode";

const Container = styled("div", {
  display: "flex",
  flexFlow: "row",
  padding: "0.5rem 0.75rem",
  backgroundColor: "$darkerBackgroundColor",
  borderRadius: "5rem",
});

const Item = styled("span", {
  color: "$text",
  fontSize: "0.75rem",
  padding: "0.625rem",
  borderRadius: "5rem",
  cursor: "pointer",
  fontWeight: "450",
  display: "flex",
  gap: "0.25rem",

  variants: {
    active: {
      true: {
        backgroundColor: "$cardBackground",
      },
      false: {
        backgroundColor: "transparent",
        opacity: 0.5,
      },
    },
  },
});

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Container>
      <Item active={theme === "light"} onClick={() => setTheme("light")}>
        <LightModeIcon />
        Light
      </Item>
      <Item active={theme === "dark"} onClick={() => setTheme("dark")}>
        <DarkModeIcon />
        Dark
      </Item>
    </Container>
  );
}
