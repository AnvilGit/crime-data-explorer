// CrimeDataByLocation.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CrimeDataByLocation from "./CrimeDataByLocation";

// Mock the sub-components used in CrimeDataByLocation
jest.mock("./InputForm", () => ({ location, category, setLocation, setCategory, fetchCoordinates }) => (
  <div data-testid="input-form">
    <button data-testid="fetch-btn" onClick={fetchCoordinates}>Fetch Data</button>
  </div>
));

jest.mock("./LoadingSpinner", () => () => <div data-testid="loading-spinner" />);
jest.mock("./ErrorMessage", () => ({ message }) => <div data-testid="error-message">{message}</div>);
jest.mock("./DataTable", () => ({ data }) => <div data-testid="data-table">{JSON.stringify(data)}</div>);
jest.mock("./Pagination", () => ({ currentPage, totalPages, onPageChange }) => (
  <div data-testid="pagination">
    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>Prev</button>
    <span>{currentPage} / {totalPages}</span>
    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
  </div>
));

// Mock Axios
jest.mock("axios");

describe("CrimeDataByLocation Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component and its child components", () => {
    render(<CrimeDataByLocation />);
    expect(screen.getByText(/Crime Data Explorer/i)).toBeInTheDocument();
    expect(screen.getByTestId("input-form")).toBeInTheDocument();
  });

  test("displays loading spinner during data fetch", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<CrimeDataByLocation />);

    fireEvent.click(screen.getByTestId("fetch-btn"));
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument());
  });

  test("displays error message for invalid location", async () => {
    axios.get.mockRejectedValueOnce(new Error("Invalid location. Please try again"));
    render(<CrimeDataByLocation />);

    fireEvent.click(screen.getByTestId("fetch-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent("Invalid location. Please try again");
    });
  });

  test("renders data table when data is fetched", async () => {
    const mockCrimeData = [{ id: 1, category: "theft" }, { id: 2, category: "robbery" }];
    axios.get.mockResolvedValueOnce({ data: [{ geometry: { lat: 0, lng: 0 } }] }); // Mock geocode API
    axios.get.mockResolvedValueOnce({ data: mockCrimeData }); // Mock crime data API

    render(<CrimeDataByLocation />);

    fireEvent.click(screen.getByTestId("fetch-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("data-table")).toHaveTextContent(JSON.stringify(mockCrimeData));
    });
  });

  test("handles pagination correctly", async () => {
    const mockCrimeData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, category: "theft" }));
    axios.get.mockResolvedValueOnce({ data: [{ geometry: { lat: 0, lng: 0 } }] }); // Mock geocode API
    axios.get.mockResolvedValueOnce({ data: mockCrimeData }); // Mock crime data API

    render(<CrimeDataByLocation />);

    fireEvent.click(screen.getByTestId("fetch-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
      expect(screen.getByText(/1 \/ 2/i)).toBeInTheDocument(); // Current page is 1 of 2
    });

    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText(/2 \/ 2/i)).toBeInTheDocument(); // Current page is 2 of 2
  });
});
