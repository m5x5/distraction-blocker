import CalendarEntry from "./Entry";

export default function CalendarDay({ events }) {
  const entries = [];

  for (let event of events) {
    entries.push(
      <CalendarEntry title={event.from}>
        <CalendarEntry.Title>{event.title}</CalendarEntry.Title>
      </CalendarEntry>
    );
  }

  return <div>{entries}</div>;
}
