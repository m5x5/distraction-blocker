// stitches.config.ts
import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      slate50: "#F8FAFC",
      slate100: "#F1F5F9",
      slate200: "#E2E8F0",
      slate300: "#CBD5E1",
      slate400: "#94A3B8",
      slate500: "#64748B",
      slate600: "#475569",
      slate700: "#334155",
      slate800: "#1E293B",
      slate900: "#0F172A",

      gray50: "#F9FAFB",
      gray100: "#F3F4F6",
      gray200: "#E5E7EB",
      gray300: "#D1D5DB",
      gray400: "#9CA3AF",
      gray500: "#6B7280",
      gray600: "#4B5563",
      gray700: "#374151",
      gray800: "#1F2937",
      gray900: "#0E1223",

      text: "$gray100",
      text1: "#AAB8C5",
      muted: "$gray500",
      mutedDark: "$gray700",

      cardBackground: "$gray800",
      backgroundColor: "#060A12",
      darkerBackgroundColor: "$gray900",
      borderColor: "$gray900",
      inputColor: "$gray700",
      tabActiveBackground: "$gray800",

      blue: "rgba(67, 97, 238, 1)",
      blueTint: "rgba(67, 97, 238, 0.1)",
      red: "rgba(243, 56, 0, 1)",
      redTint: "rgba(243, 56, 0, 0.1)",
    },
    sizes: {},
    fontSizes: {
      xs: "0.75rem",
      sm: "1rem",
      md: "1.25rem",
      lg: "1.5rem",
      xl: "1.75rem",
      "2xl": "2rem",
      "3xl": "3rem",
    },
    radii: ["0", "0.25rem", "0.5rem", "0.75rem", "1rem"],
  },

  utils: {},
});

export const lightTheme = createTheme("light-theme", {
  colors: {
    backgroundColor: "#FAFBFF",
    darkerBackgroundColor: "#F6F7FF",
    borderColor: "#E2E8F0",
    cardBackground: "#FFFFFF",
    text: "#0E1223",
    text1: "#AAB8C5",
    inputColor: "#FFF",
    tabActiveBackground: "rgba(67, 97, 238, 0.1)",
  },
});

export const globalStyles = globalCss({
  body: {
    color: "$slate50",
    backgroundColor: "$backgroundColor",
  },
});
