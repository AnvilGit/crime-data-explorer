import React from "react";

const InputForm = ({ location, category, setLocation, setCategory, fetchCoordinates }) => {
  // List of available crime categories
  const categories = [
    "all-crime",
    "anti-social-behaviour",
    "burglary",
    "bicycle-theft",
    "drugs",
    "shoplifting",
    "vehicle-crime",
    "violent-crime",
    "public-order",
  ];

  return (
    // Input form for location and category 
    <div style={{ marginBottom: "10px", marginTop: "10px" }}>
      <input 
        type="text"
        placeholder="Enter location (e.g., Southampton)"
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update location state
        className="city"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)} // Update category state
        style={{ 
            marginRight: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
         }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.replace("-", " ")}  {/* Format category names for better readability */}
          </option>
        ))}
      </select>
      <button 
      onClick={fetchCoordinates}  // Trigger data fetching
      >
        Fetch Data
      </button>
    </div>
  );
};

export default InputForm;
