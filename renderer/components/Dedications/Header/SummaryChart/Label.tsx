import { styled } from "../../../../stitches.config";

const RADIAN = Math.PI / 180;

const Label = styled("text", {
  fontSize: "0.8rem !important",
});

export default function SummaryChartLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.1) {
    return null;
  }

  return (
    <Label
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </Label>
  );
}
