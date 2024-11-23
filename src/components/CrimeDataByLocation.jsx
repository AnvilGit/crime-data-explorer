import React, { useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import DataTable from "./DataTable";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const CrimeDataByLocation = () => {
  // State variables
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("all-crime");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cache = {};

  // Fetch coordinates for the given location
  const fetchCoordinates = async () => {
    // Reset state for a fresh fetch
    setLoading(true);
    setError(null);
    setData(null);

    // Check if the location input is empty
    if (!location.trim()) {
      setLoading(false);
      setError("Enter location name"); // Set error for missing location
      return;
    }

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
      if (results.length === 0) throw new Error("Invalid location. Please try again");// Handle case where location is invalid

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
      const crimeResponse = await axios.get(
        `https://data.police.uk/api/crimes-street/${category}?lat=${latitude}&lng=${longitude}`
      );
      if (crimeResponse.data.length === 0) throw new Error("No crime data found.");

      // Store fetched data in cache
      cache[cacheKey] = crimeResponse.data;

      setData(crimeResponse.data); // Update state with fetched data
      setError(null) // Clear any errors
    } catch (err) {
      setError(err.message || "Failed to fetch crime data."); // Display error message
    } finally {
      setLoading(false); // Disable loading spinner
    }
  };

  return (
    <div className="content-container">
      <h1 style={{marginBottom:"20px"}}>Crime Data Explorer</h1>
      <p>Welcome to Crime Data Explorer, your essential resource for understanding crime trends in various locations. </p>
      <p>Our application allows users to access real-time crime data, providing insights into safety and security in neighborhoods.</p>

      <p>Just enter the location and select a specific crime category to retrieve detailed information about incidents in that area. </p>
      <p>Our app utilizes reliable geolocation services for accurate data retrieval, empowering you to make informed decisions.</p>
      <p>Explore crime statistics today and enhance your awareness of local safety issues.</p>

      <InputForm
        location={location}
        category={category}
        setLocation={setLocation}
        setCategory={setCategory}
        fetchCoordinates={fetchCoordinates}
      />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && <DataTable data={data} />}
    </div>
  );
};

export default CrimeDataByLocation;
