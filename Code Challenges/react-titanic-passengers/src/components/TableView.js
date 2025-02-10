import React from "react";
import '../styles/TableView.css'

const TableView = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Survived</th>
          <th>Class</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Age</th>
          <th>SibSp</th>
          <th>Parch</th>
          <th>Ticket</th>
          <th>Fare</th>
          <th>Cabin</th>
          <th>Embarked</th> 
        </tr>
      </thead>
      <tbody>
        {data.map((passenger, index) => (
          <tr key={index}>
            <td>{passenger.Survived ? "Yes" : "No"}</td>
            <td>{passenger.Pclass}</td>
            <td>{passenger.Name}</td>
            <td>{passenger.Sex}</td>
            <td>{passenger.Age || "-"}</td>
            <td>{passenger.SibSp}</td>
            <td>{passenger.Parch}</td>
            <td>{passenger.Ticket}</td>
            <td>{passenger.Fare}</td>
            <td>{passenger.Cabin || "-"}</td>
            <td>{passenger.Embarked}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;