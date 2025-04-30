import { styled } from "../../stitches.config";
import CalendarDay from "./Calendar/Day";

const events = [
  {
    title: "Sleep",
    start: new Date(2020, 0, 1, 0, 0, 0),
    end: new Date(2020, 0, 1, 6, 0, 0),
  },
];

const Container = styled("div", {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "auto repeat(7, 1fr)",
  gridTemplateRows: "1fr",
  gridAutoFlow: "row",
  gap: "0.5rem",

  "> div.descriptor": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  "> div:not(.descriptor)": {
    backgroundColor: "$gray800",
    minHeight: "40vh",
    borderRadius: "$1",
  },
});

export default function Calendar() {
  return (
    <Container>
      <div className="descriptor">
        <span>0</span>
        <span>12</span>
        <span>24</span>
      </div>
      <CalendarDay events={events} />
      <CalendarDay events={events} />
      <CalendarDay events={events} />
      <CalendarDay events={events} />
      <CalendarDay events={events} />
      <CalendarDay events={events} />
      <CalendarDay events={events} />
    </Container>
  );
}
