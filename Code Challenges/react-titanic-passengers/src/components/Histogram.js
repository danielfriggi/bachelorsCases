import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import '../styles/Histogram.css'

const Histogram = ({ data }) => {
  const survivalData = [
    { class: "1ª Class", survivors: data.filter(p => p.Pclass === 1 && p.Survived).length },
    { class: "2ª Class", survivors: data.filter(p => p.Pclass === 2 && p.Survived).length },
    { class: "3ª Class", survivors: data.filter(p => p.Pclass === 3 && p.Survived).length }
  ];
  
  return (
    <div className="histogram-wrapper">
      <div className="recharts-wrapper">
    <BarChart width={1200} height={600} data={survivalData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="class" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="survivors" fill="#82ca9d" />
    </BarChart>
    </div>
    </div>
  );
};

export default Histogram;
