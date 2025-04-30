import { ipcRenderer } from "electron";
import { useCallback, useEffect, useState } from "react";
import { styled } from "../../stitches.config";
import Card from "../core/Card";
import VerticalProgress from "./VerticalProgress";

const Container = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "auto auto",
  padding: "1rem",

  "> h2": {
    fontSize: "1.125rem",
    fontWeight: "500",
  },
});

export default function Timer() {
  const [time, setTime] = useState(0);

  const getTime = useCallback(() => {
    ipcRenderer.invoke("getTime", "development").then((d) => {
      setTime(d);
      setTimeout(() => getTime(), 1000);
    });
  }, []);

  useEffect(() => getTime(), [getTime]);

  const FOUR_HOURS_IN_SECONDS = 60 * 60 * 4;

  return (
    <Container className={"w-5/6"}>
      <h2 className="dark:text-white text-black">Summary</h2>
      <VerticalProgress max={FOUR_HOURS_IN_SECONDS} min={0} value={time} />
    </Container>
  );
}
