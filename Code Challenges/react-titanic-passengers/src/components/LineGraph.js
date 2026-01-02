import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import '../styles/LineGraph.css'

const LineGraph = ({ data }) => {

  const sortedData = data.filter(p => p.Age && p.Fare).sort((a, b) => a.Age - b.Age);

  return (
    <div className="line-graph-wrapper">
      <div className="recharts-wrapper">
    <LineChart width={1200} height={600} data={sortedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Age" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Fare" stroke="#8884d8" />
    </LineChart>
     </div>
     </div>
  );
};

export default LineGraph;