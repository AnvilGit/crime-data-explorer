// src/App.jsx

import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import CrimeDataByLocation from './components/CrimeDataByLocation'; 
import About from './pages/About'; // 
import Footer from './components/Footer'; 


const App = () => {
    return (
        <Router>
            {/* Main container for the application */}
            <div className="app-container">
                {/* Navigation bar */}
                <nav className="nav-container">
                    {/* List of navigation links */}
                    <ul className="nav-list">
                        <li>
                            {/* Link to the Home page */}
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            {/* Link to the About page */}
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>

                {/* Define the routes for the application */}
                <Routes>
                    {/* Route for the Home page */}
                    <Route path="/" element={<CrimeDataByLocation />} />
                    {/* Route for the About page */}
                    <Route path="/about" element={<About />} />
                </Routes>

                {/* Footer component */}
                <Footer />
            </div>
        </Router>
    );
};

export default App; 
