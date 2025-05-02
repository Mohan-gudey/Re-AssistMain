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
      {/* <Route path="/signup" element={<Signup />} /> */}
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



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ArxivSearch = () => {
//   const [papers, setPapers] = useState([]); // Main list of papers from API
//   const [selectedPapers, setSelectedPapers] = useState([]); // Papers added to the side tab
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://export.arxiv.org/api/query?search_query=ti:%22electron%20thermal%20conductivity%22&sortBy=lastUpdatedDate&sortOrder=ascending"
//         );

//         // Parse the XML response
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(response.data, "application/xml");

//         const entries = Array.from(xmlDoc.querySelectorAll("entry")).map((entry) => {
//           const title = entry.querySelector("title")?.textContent.trim() || "No Title";
//           const authors = Array.from(entry.querySelectorAll("author name")).map(
//             (author) => author.textContent
//           );
//           const publishedDate = entry.querySelector("published")?.textContent || "Unknown Date";
//           const summary = entry.querySelector("summary")?.textContent.trim() || "No Abstract";
//           const link = entry.querySelector("id")?.textContent || "#";

//           return { title, authors, publishedDate, summary, link };
//         });

//         setPapers(entries);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch data from arXiv API.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to add a paper to the side tab
//   const addToSideTab = (paper) => {
//     setSelectedPapers((prevSelected) => [...prevSelected, paper]);
//     setPapers((prevPapers) => prevPapers.filter((p) => p.link !== paper.link));
//   };

//   // Function to remove a paper from the side tab
//   const removeFromSideTab = (paper) => {
//     setPapers((prevPapers) => [...prevPapers, paper]);
//     setSelectedPapers((prevSelected) => prevSelected.filter((p) => p.link !== paper.link));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-lg font-semibold">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto p-4">
//         <h1 className="text-3xl font-bold text-center mb-8">arXiv Papers on Electron Thermal Conductivity</h1>
//         <div className="space-y-6">
//           {papers.map((paper, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-800">{paper.title}</h2>
//               <p className="text-sm text-gray-600 mt-2">
//                 Authors: {paper.authors.join(", ") || "Unknown"}
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Published: {new Date(paper.publishedDate).toLocaleDateString()}
//               </p>
//               <p className="text-gray-700 mt-3">{paper.summary}</p>
//               <button
//                 onClick={() => addToSideTab(paper)}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
//               >
//                 Add to Side Tab
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Side Tab */}
//       <div className="w-96 bg-gray-100 p-4 overflow-y-auto border-l">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Selected Papers</h2>
//         {selectedPapers.length > 0 ? (
//           <div className="space-y-4">
//             {selectedPapers.map((paper, index) => (
//               <div key={index} className="bg-white shadow-md rounded-lg p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">{paper.title}</h3>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Authors: {paper.authors.join(", ") || "Unknown"}
//                 </p>
//                 <button
//                   onClick={() => removeFromSideTab(paper)}
//                   className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No papers selected.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ArxivSearch;