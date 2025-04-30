import { styled } from "../stitches.config";
import DedicationsContainer from "./Dedications";
import GoalsView from "./Goals";
import HabitsOverview from "./Routines";
import Schedule from "./Schedule";
import Settings from "./Settings";
import StatsView from "./Stats";

const Container = styled("div", {
  maxHeight: "100vh",
  overflowY: "auto",
});

export default function Tab({ active }: { active: string }) {
  return (
    <Container>
      {["", "jobs"].includes(active) && <HabitsOverview />}
      {"goals" === active && <GoalsView />}
      {["dedicate"].includes(active) && <DedicationsContainer />}
      {["stats"].includes(active) && <StatsView />}
      {["schedule"].includes(active) && <Schedule />}
      {["settings"].includes(active) && <Settings />}
    </Container>
  );
}
