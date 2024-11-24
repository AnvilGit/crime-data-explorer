import React from "react";

const LoadingSpinner = ({ message = "Fetching crime data from the API, please wait..."}) => (
  <div style={{ marginTop: "20px", textAlign: "center" }}>
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid #ccc",
        borderTop: "4px solid #007bff",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto",
      }}
    ></div>
    <p style={{ marginTop: "10px", fontSize: "18px", color: "#555" }}>
      {message || "Loading..."}
    </p>
  </div>
);

export default LoadingSpinner;





