import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Details from "./components/Details";
import titanicData from "./data/titanic.json";
import './styles/App.css';

const App = () => {
  const [selectedView, setSelectedView] = useState("table");

  return (
    <div className="container">
      <Sidebar selectedView={selectedView} setSelectedView={setSelectedView} />
      <Details selectedView={selectedView} data={titanicData} />
    </div>
  );
};

export default App;