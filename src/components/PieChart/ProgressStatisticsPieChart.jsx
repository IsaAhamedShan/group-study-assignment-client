import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00d8b0"];

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
    const { userTotalSubmissionCount, docAfterCreationTime } = this.props;
    console.log("userTotalSubmissionCount", userTotalSubmissionCount);
    console.log("docAfterCreationTime ",docAfterCreationTime);
    const data = [
      { name: `Completed (${userTotalSubmissionCount}) `, value: userTotalSubmissionCount },
      { name: `Total (${docAfterCreationTime})`, value: parseInt(docAfterCreationTime) },
    ];
    return (
      userTotalSubmissionCount >0 ? (<div className="bg-white w-[300px] h-[300px]">
      <h1 className="font-bold text-center text-black">My Life time submission</h1>
      <div className="pie-chart-container  flex justify-center flex-col items-end bg-white w-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              className=""
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
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
          <Legend></Legend>
          </PieChart>
        </ResponsiveContainer>
        
      </div>
    </div>) : <div className="flex justify-center items-center my-20"> <p className="text-3xl md:text-5xl lg:text-7xl m-auto text-gray-300">Empty</p></div>
      
    );
  }
}

export default progressStatisticsPieChart;
