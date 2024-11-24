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

// Add CSS for spinning animation
const styles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

