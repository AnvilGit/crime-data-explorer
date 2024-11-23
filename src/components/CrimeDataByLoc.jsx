//This is the original code from whre other components were made.
//it is just here for reference and won't be uploaded on deployment
import React, { useState } from "react";
import axios from "axios";

const CrimeDataByLocation = () => {
  // State variables
  const [location, setLocation] = useState(""); // Stores the user-inputted location
  const [category, setCategory] = useState("all-crime"); // Stores the selected crime category
  const [data, setData] = useState(null); // Stores the fetched crime data
  const [loading, setLoading] = useState(false); // Tracks whether data is being loaded
  const [error, setError] = useState(null); // Tracks errors during fetching
  const cache = {}; // Cache object to store fetched data for optimization

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

  // Fetch coordinates for the given location
  const fetchCoordinates = async () => {
    setLoading(true); // Enable loading spinner
    setError(null); // Clear any previous errors
    setData(null); // Clear previous data

    try {
      const cacheKey = `${location}_${category}`; // Generate a unique key for caching based on location and category

      // Check if the result is already in cache
      if (cache[cacheKey]) {
        console.log("Serving data from cache...");
        setData(cache[cacheKey]); // Use cached data
        setLoading(false); // Disable loading spinner
        return;
      }

      // Make a request to fetch geocode data for the location
      const geocodeResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=e12ca46d266b44aeb1a74edae73142c7`
      );

      const results = geocodeResponse.data.results;
      if (results.length === 0) {
        throw new Error("Invalid location. Please try again."); // Handle case where location is invalid
      }

      const { lat, lng } = results[0].geometry; // Extract latitude and longitude from the geocode response
      fetchCrimeData(lat, lng, cacheKey); // Fetch crime data using the coordinates
    } catch (err) {
      setLoading(false); // Disable loading spinner
      setError(err.message || "Failed to fetch location coordinates."); // Display error message
    }
  };

  // Fetch crime data for the specified latitude, longitude, and category
  const fetchCrimeData = async (latitude, longitude, cacheKey) => {
    try {
      // Fetch crime data from the police API
      const crimeResponse = await axios.get(
        `https://data.police.uk/api/crimes-street/${category}?lat=${latitude}&lng=${longitude}`
      );

      if (crimeResponse.data.length === 0) {
        throw new Error("No crime data available for this location."); // Handle case where no crime data is found
      }

      // Store fetched data in cache
      cache[cacheKey] = crimeResponse.data;

      setData(crimeResponse.data); // Update state with fetched data
      setError(null); // Clear any errors
    } catch (err) {
      setError(err.message || "Failed to fetch crime data."); // Display error message
    } finally {
      setLoading(false); // Disable loading spinner
    }
  };

  return (
    
    <div className="content-container">
      <h1 style={{marginBottom:"20px"}}>Crime Data by Location</h1>
      <p>Welcome to Crime Data Explorer, your essential resource for understanding crime trends in various locations. </p>
      <p>Our application allows users to access real-time crime data, providing insights into safety and security in neighborhoods.</p>

<p>With just a few clicks, you can enter a location and select a specific crime category to retrieve detailed information about incidents in that area. </p>
Our app utilizes reliable geolocation services for accurate data retrieval, empowering you to make informed decisions.
<p>Explore crime statistics today and enhance your awareness of local safety issues. Join us in fostering safer communities with Crime Data Explorer!</p>
      
      {/* Input form for location and category */}
      <div style={{ marginBottom: "10px", marginTop: "10px" }}>
        <input className="city"
          type="text"
          placeholder="Enter location (e.g., Southampton)"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Update location state
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
              {cat.replace("-", " ")} {/* Format category names for better readability */}
            </option>
          ))}
        </select>

        <button 
          onClick={fetchCoordinates} // Trigger data fetching
         >
          Fetch Data
        </button>
      </div>

      {/* Display loading spinner */}
      {loading && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
          Loading...
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div style={{ marginTop: "20px", color: "red", fontSize: "16px" }}>
          {error}
        </div>
      )}

      {/* Display fetched data in a table */}
      {data && (
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
                    {crime.outcome_status
                      ? crime.outcome_status.category
                      : "No outcome"} {/* Display outcome status or default message */}
                  </td>
                  <td style={tableCellStyle}>{crime.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

export default CrimeDataByLocation;
