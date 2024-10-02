import React from "react";
import dataJson from "../../data/data.json";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
console.log(dataJson);
export default function ChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dataJson}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="pv"
          fill="#1679AB"
          activeBar={<Rectangle fill="#FABC3F" stroke="blue" />}
        />
        <Bar
          dataKey="uv"
          fill="#FFB1B1"
          activeBar={<Rectangle fill="#1230AE" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
