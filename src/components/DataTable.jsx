import React from "react";

//Display fetched data in a table
const DataTable = ({ data }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Crime Data</h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Location</th>
            <th style={tableHeaderStyle}>Outcome</th>
            <th style={tableHeaderStyle}>Year-Month</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crime, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{crime.category}</td>
              <td style={tableCellStyle}>{crime.location.street.name}</td>
              <td style={tableCellStyle}>
                {crime.outcome_status ? crime.outcome_status.category : "No outcome"}{/* Display outcome status or default message */}
              </td>
              <td style={tableCellStyle}>{crime.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Table header styles
const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
  fontWeight: "bold",
};

// Table cell styles
const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

export default DataTable;
