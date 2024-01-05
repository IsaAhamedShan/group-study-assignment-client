import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class progressStatisticsPieChart extends React.Component {
  render() {
    const { userTotalSubmissionCount,docAfterCreationTime } = this.props;
    console.log("u and d ",userTotalSubmissionCount,docAfterCreationTime)
    const data = [
      { name: "Group A", value: userTotalSubmissionCount },
      { name: "Group B", value: docAfterCreationTime },
    ];
    return (
      <div className="bg-white w-[300px] h-[300px]">
        <div className="pie-chart-container  flex justify-center items-end bg-white w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                className=""
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div><p className="text-black">abcd</p></div>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default progressStatisticsPieChart;
