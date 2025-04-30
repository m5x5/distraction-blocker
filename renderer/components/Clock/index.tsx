import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { useDetailsContext } from "../../context/DetailsContext";
import { styled } from "../../stitches.config";
import Text from "../core/Text";

const Container = styled("div", {
  fontWeight: "bold",
  color: "$text",
  gap: "2rem",
  border: "2px solid $borderColor",
  borderRadius: "1rem",
  padding: "1.5rem",
  top: "4.19rem",
  width: "82%",

  "> p": {
    marginBottom: "0.38rem",
  },

  "> h2": {
    fontSize: "3rem",
    fontWeight: "700",
    padding: "0",
    margin: "0",
    lineHeight: "1.265",
  },
});

export default function Clock() {
  const [date, setDate] = useState(new Date());
  // const [time, setTime] = useState(0);
  // const [devTime, setDevTime] = useState(0);
  const { editing } = useDetailsContext();

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, [date]);

  function tick() {
    ipcRenderer.invoke("getTime", "development").then((t) => {
      // setDevTime(t);
    });
    ipcRenderer.invoke("getTime", "study").then((d) => {
      // setTime(d);
    });
    setDate(new Date());
  }

  let hours = date.getHours();
  let minutes = date.getMinutes();

  return (
    <Container>
      <Text>Monday, 16th May</Text>
      {editing ? (
        <h2>
          {hours >= 10 ? hours : "0" + hours}:
          {minutes >= 10 ? minutes : "0" + minutes}
        </h2>
      ) : (
        <>
          <h2>
            {hours >= 10 ? hours : "0" + hours}:
            {minutes >= 10 ? minutes : "0" + minutes}
          </h2>
        </>
      )}
    </Container>
  );
}
