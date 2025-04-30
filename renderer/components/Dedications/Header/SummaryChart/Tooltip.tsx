import { styled } from "../../../../stitches.config";

const Container = styled("div", {
  backgroundColor: "$gray800",
  fontSize: "0.8rem",
  borderRadius: "0.5rem",
  padding: "0.1rem 0.5rem",
});

export default function SummaryChartTooltip({ ...props }) {
  const name = props.payload[0]?.name;
  return (
    <Container>
      <p className="desc">{name}</p>
    </Container>
  );
}
