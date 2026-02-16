import React from "react";
import '../styles/Sidebar.css'

const Sidebar = ({ selectedView, setSelectedView }) => {
  return (
    <div className="header">
      <h1>Titanic ShipWreck</h1>
      <div className="sidebar">
        <h2>Presentation</h2>
        <select value={selectedView} onChange={(e) => setSelectedView(e.target.value)}>
          <option value="table">Table</option>
          <option value="line">Line Graph</option>
          <option value="histogram">Histogram</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;