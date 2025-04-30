import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import "react-contexify/dist/ReactContexify.min.css";
import DevelopmentBadge from "../components/core/DevelopmentBadge";
import { globalStyles, lightTheme } from "../stitches.config";
import "../styles/globals.css";

const isProd = process.env.NODE_ENV === "production";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  const [mounted, setMounted] = useState(false);

  // Disable SSR
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        dark: "dark",
        light: lightTheme.className,
      }}
    >
      {!isProd && <DevelopmentBadge />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
