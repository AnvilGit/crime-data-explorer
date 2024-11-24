# Reactjs App
## crime-data-explorer

Crime Data Explorer is a React application designed to help users access real-time crime data for various locations. By simply entering a location and selecting a specific crime category, users can retrieve detailed information about incidents in the selected area. This tool is ideal for individuals or organizations looking to enhance their awareness of local safety and security issues.

## Features

**Real-Time Data Retrieval**: 
- Get up-to-date crime data from the UK Police API.
- **Location-Based Crime Data**:
- Enter a city or town name to fetch geolocation details.
- **Crime Categories**: Filter results by crime type for more specific insights.-
- **Data Caching**:
- Reuse previously fetched data for faster performance and reduced API calls.
-  **Error Handling**:
-  Displays user-friendly messages for invalid input or no available data.
-   **Interactive Interface**:
-   User-friendly design to improve accessibility and ease of use.

## Technologies Used

- React
- JavaScript (ES6)
- HTML/CSS

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js v14 or higher](https://nodejs.org/) (includes npm)
- A code editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))

### Installation

1. Clone the repository:


   git clone https://github.com/AnvilGit/crime-data-explorer.git

1. Navigate to the project directory:

cd crime-data-explorer folder



2. Install the dependencies:

npm install



3. Start the development server:


npm run dev



4. Open your browser and go to http://localhost:5173 to view the application.

### Live Application URL

The Application is deployed in https://crime-data-explorer.netlify.app
Click on the link to see the application

### Usage
- Enter a Location: Input the name of the city or town you want to query.
- Select a Crime Category: Choose a category such as "Anti-social behavior," "Violence," or "All crimes."
- Fetch Data: Click the search button to retrieve and display the results.


### Project Structure
- App.jsx: The main component that manages the state of the application, including routes and edit functionality.
- InputForm.jsx: Handles user input for location and crime category.
- DataTable.jsx: Displays crime data in a structured table
- LoadingSpinner.jsx: Visual feedback for ongoing data retrieval
- ErrorMessage.jsx: Displays user-friendly error messages
- CrimeDataByLocation.jsx: Main component that manages application state and logic
- Pagination.jsx


### API Information
 This application uses the following APIs:
1. OpenCage Geocoding API:
- Fetches geolocation data (latitude & longitude) based on user input.
- OpenCage API Documentation


2. UK Police Data API:
- Fetches crime data based on geolocation and category.
- UK Police API Documentation

### Known Issues
Currently limited to locations supported by the UK Police API.
Requires an active internet connection to fetch data.

### Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments
- OpenCage API for providing geolocation services.
- UK Police API for crime data.
- All contributors and the open source community.


### Future Enhancements
- Add support for non-UK locations.
- Improve UI/UX for mobile devices.
- Include visualization (e.g., graphs or heatmaps) for crime trends.
- Add user authentication for personalized features.
