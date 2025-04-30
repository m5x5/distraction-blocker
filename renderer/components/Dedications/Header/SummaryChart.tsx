import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { styled } from "../../../stitches.config";
import { useDedicationsContext } from "../Context";
import SummaryChartLabel from "./SummaryChart/Label";
import SummaryChartTooltip from "./SummaryChart/Tooltip";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Container = styled("div", {
  backgroundColor: "$cardBackground",
});

export default function SummaryChart() {
  let { dedications } = useDedicationsContext();
  dedications = dedications?.[0] ? dedications : [];

  const data = dedications.map(({ name, hours, quantity }) => {
    return {
      name,
      value: hours * quantity,
    };
  });

  return (
    <Container className="text-left p-5 rounded-md">
      <ResponsiveContainer aspect={1.5} className="mt-3" height="auto">
        <PieChart>
          <Tooltip content={SummaryChartTooltip} />
          <Pie
            data={data}
            dataKey="value"
            fill="#8884d8"
            label={SummaryChartLabel}
            labelLine={false}
            outerRadius={80}
            animationDuration={0}
          >
            {data.map((_e, index) => (
              <Cell
                key={`cell-${index}`}
                stroke="1px solid #fff"
                // @ts-ignore
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}
