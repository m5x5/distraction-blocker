import { CogIcon } from "@heroicons/react/solid";
import { ipcRenderer } from "electron";
import { useEffect } from "react";
import { styled } from "../../stitches.config";
import GoalsIcon from "../core/icons/Goals";
import HabitsIcon from "../core/icons/Habits";
import LogoIcon from "../core/icons/Logo";
import ScheduleIcon from "../core/icons/Schedule";
import StatisticsIcon from "../core/icons/Statistics";
import GoalIcon from "../core/icons/Tasks";
import TabSwitcherItem from "./Item";

const Container = styled("div", {
  color: "$text",
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  boxSizing: "border-box",
  backgroundColor: "$cardBackground",
});

const Top = styled("div", {
  marginTop: "1.5rem",
  marginLeft: "1.5rem",
  marginBottom: "9rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export default function TabSwitcher({ setActive, active }) {
  useEffect(() => {
    const listener = (_e, name) => {
      setActive(name);
    };

    ipcRenderer.on("switchTab", listener);

    return () => {
      ipcRenderer.removeListener("switchTab", listener);
    };
  }, []);

  return (
    <Container>
      <Top>
        <LogoIcon />
        <h2>Leptum</h2>
      </Top>
      <TabSwitcherItem
        name="goals"
        displayName="Tasks"
        onClick={setActive}
        selected={active}
        icon={<GoalIcon />}
      />
      <TabSwitcherItem
        name="jobs"
        displayName="Habits"
        onClick={setActive}
        selected={active}
        icon={<HabitsIcon />}
      />
      <TabSwitcherItem
        name="dedicate"
        displayName="Goals"
        onClick={setActive}
        selected={active}
        icon={<GoalsIcon />}
      />
      <TabSwitcherItem
        name="stats"
        displayName="Statistics"
        onClick={setActive}
        selected={active}
        icon={<StatisticsIcon />}
      />
      <TabSwitcherItem
        name="schedule"
        displayName="Schedule"
        onClick={setActive}
        selected={active}
        icon={<ScheduleIcon />}
      />
      <TabSwitcherItem
        name="settings"
        displayName="Settings"
        onClick={setActive}
        selected={active}
        icon={<CogIcon style={{ height: "1.5rem" }} />}
        style={{ marginTop: "auto" }}
      />
    </Container>
  );
}
