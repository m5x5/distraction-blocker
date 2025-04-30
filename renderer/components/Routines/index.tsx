import { useEffect, useState } from "react";
import useSWR from "swr";
import { styled } from "../../stitches.config";
import { getHeaders } from "../../utils/api";
import HabitList from "./HabitList";
import RoutineList from "./List";

const Container = styled("span", {
  color: "$sans",
});

const API =
  process.env.LEPTUM_API || "http://localhost:3000";

const fetcher = async (url) => {
  const headers = await getHeaders();
  return fetch(API + url, { headers }).then((r) => r.json());
};

export default function HabitsOverview() {
  const { data: routines } = useSWR("/jobs", fetcher);
  const [selected, setSelected] = useState("");
  const routine = routines?.find?.((r) => r?.id === selected);

  useEffect(() => {
    if (!routines) return;
    const routine = routines?.find((r) => r?.id === selected);
    if (routine) return;
    setSelected(routines[0]?.id);
  }, [routines, selected]);

  return (
    <Container>
      <RoutineList items={routines} onSelect={setSelected} />
      <HabitList routine={routine} />
    </Container>
  );
}
