// // import React, { useState, useEffect } from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';

// // // Import all page components
// // import LandingPage from './pages/LandingPage';
// // import Dashboard from './pages/Dashboard';
// // import Resources from './pages/Resources';
// // import NotFound from './pages/NotFound';
// // import Login from './components/Login';
// // import ResearchProfilePage from './components/ResearchProfilePage'; // Import the new profile page
// // import UserDetailsForm from './components/UserDetailsForm';


// // const App = () => {
// //   // Simulating user authentication state (replace with actual auth logic)
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   useEffect(() => {
// //     // Here, you would check if the user is authenticated (e.g., check a token or user session)
// //     const userAuthStatus = localStorage.getItem('authStatus');
// //     if (userAuthStatus === 'authenticated') {
// //       setIsAuthenticated(true);
// //     }
// //   }, []);

// //   return (
// //     <Routes>
// //       {/* Public routes */}
// //       <Route path="/" element={<LandingPage />} />
// //       <Route path="/signin" element={<Login />} />
// //       {/* <Route path="/signup" element={<Signup />} /> */}
// //       <Route path="/user-details-form" element={<UserDetailsForm />} />
// //       <Route path="/resources" element={<Resources />} />
      
// //       {/* Protected routes */}
// //       <Route path="/dashboard/*" element={<Dashboard />} />
      
// //       {/* Profile route */}
// //       <Route path="/profile" element={<ResearchProfilePage />} />
      
// //       {/* 404 route */}
// //       <Route path="*" element={<NotFound />} />
// //     </Routes>
// //   );
// // };

// // export default App;


// // src/App.jsx
// import { useState } from 'react';
// import FileUploader from './components/Pdf-Summary/FileUploader';
// import ResultsDisplay from './components/Pdf-Summary/ResultsDisplay';

// function App() {
//   const [abstract, setAbstract] = useState(null);
//   const [keywords, setKeywords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [rawText, setRawText] = useState('');

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold text-blue-700 border-b pb-2 mb-6">Research Paper Extractor</h1>
//       <FileUploader
//         setAbstract={setAbstract}
//         setKeywords={setKeywords}
//         setRawText={setRawText}
//         setLoading={setLoading}
//       />
//       {/* <SettingsPanel /> */}
//       {loading && <p className="text-blue-500 mt-4 italic">Processing PDF...</p>}
//       {(abstract || keywords.length > 0) && (
//         <ResultsDisplay abstract={abstract} keywords={keywords} rawText={rawText} />
//       )}
  
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import ResearchProfilePage from './components/ResearchProfilePage';
import UserDetailsForm from './components/UserDetailsForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userAuthStatus = localStorage.getItem('authStatus');
    if (userAuthStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/user-details-form" element={<UserDetailsForm />} />
      <Route path="/resources" element={<Resources />} />

      {/* Protected Routes */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/profile" element={<ResearchProfilePage />} />

      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;


