import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import all page components
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './components/Login';
import ResearchProfilePage from './components/ResearchProfilePage'; // Import the new profile page

const App = () => {
  // Simulating user authentication state (replace with actual auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Here, you would check if the user is authenticated (e.g., check a token or user session)
    const userAuthStatus = localStorage.getItem('authStatus');
    if (userAuthStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resources" element={<Resources />} />
      
      {/* Protected routes */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      
      {/* Profile route */}
      <Route path="/profile" element={<ResearchProfilePage />} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
