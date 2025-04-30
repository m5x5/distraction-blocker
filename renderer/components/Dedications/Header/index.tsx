import { styled } from "../../../stitches.config";
import SummaryChart from "./SummaryChart";

const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridAutoFlow: "row",
});

export default function DedicationsHead() {
  return (
    <Container>
      <SummaryChart />
    </Container>
  );
}
