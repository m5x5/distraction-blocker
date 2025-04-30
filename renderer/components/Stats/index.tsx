import useSWR from "swr";
import { styled } from "../../stitches.config";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
  gap: ".5rem",
  padding: "1rem",
  color: "$text",
});

const Muted = styled("p", {
  color: "$text1",
});

const Goal = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  width: "100%",
  justifyContent: "space-between",
  padding: "1rem",
  backgroundColor: "$cardBackground",
});

const API =
  process.env.LEPTUM_API || "http://localhost:3000";
const fetcher = (url: string) => fetch(API + url).then((res) => res.json());

export default function StatsView() {
  let { data: goals } = useSWR("/goals/last-completed", fetcher);

  return (
    <Container>
      {goals?.map?.((g) => (
        <Goal key={g.id}>
          <p>{g.name}</p>
          <Muted>{new Date(g.doneDate).toDateString()}</Muted>
          <Muted>{g.isDone ? "Done" : "Not Done"}</Muted>
        </Goal>
      ))}
    </Container>
  );
}
