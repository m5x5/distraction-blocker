import { useEffect, useRef } from "react";
import { styled } from "../../stitches.config";

const Container = styled("div", {
  display: "grid",
  placeItems: "center",
  height: "100%",
  borderRadius: "$2",
  width: "50%",
  margin: "0 auto",
  boxSizing: "border-box",

  "> h1": {
    fontSize: "$md",
    color: "white",
    fontWeight: '400',
  },
});

type Props = {
  value: number;
  max: number;
  min: number;
};

export default function VerticalProgress({ value, max, min }: Props) {
  const ref = useRef<HTMLDivElement>();
  const percentage = (value / max) * 100;

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    const progressColor = "#1d38af";
    const backgroundColor = "#4361EE";

    current.style.background = `linear-gradient(to top, ${progressColor} ${percentage.toFixed(
      2
    )}%, ${backgroundColor} ${percentage.toFixed(2)}%)`;
  }, [percentage]);

  return (
    <Container ref={ref} className={"h-80 relative overflow-hidden"}>
      <h1>{percentage.toFixed(2)}%</h1>
      <div className={"wave"}></div>
      <div className={"wave"}></div>
    </Container>
  );
}
