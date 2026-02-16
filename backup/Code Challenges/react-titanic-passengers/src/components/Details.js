import React from "react";
import TableView from "./TableView";
import LineGraph from "./LineGraph";
import Histogram from "./Histogram";

const Details = ({ selectedView, data }) => {
  return (
    <div className="details">
      {selectedView === "table" && <TableView data={data} />}
      {selectedView === "line" && <LineGraph data={data} />}
      {selectedView === "histogram" && <Histogram data={data} />}
    </div>
  );
};

export default Details;