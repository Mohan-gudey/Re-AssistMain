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




// // App.js
// // src/App.js
// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.name.endsWith(".bib")) {
//       setFile(selectedFile);
//     } else {
//       alert("Please upload a valid .bib file.");
//     }
//   };

//   // Handle file upload
//   const handleSubmit = async () => {
//     if (!file) {
//       alert("No file selected.");
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const formData = new FormData();
//       formData.append("bibFile", file); // Ensure the key matches the backend (`bibFile`)
  
//       console.log("Uploading file:", file); // Log the file being uploaded
  
//       // Send the .bib file to the backend
//       const response = await axios.post("https://re-assist-backend.onrender.com/api/bib/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // This header is optional; Axios sets it automatically
//         },
//       });
  
//       console.log("Response from server:", response.data); // Log the server response
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error uploading .bib file:", error.response?.data || error.message);
//       alert("An error occurred while uploading the .bib file.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold mb-6">Upload Your .bib File</h1>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <input
//           type="file"
//           accept=".bib"
//           onChange={handleFileChange}
//           className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
//             loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Processing..." : "Upload and Save Papers"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.name.endsWith(".bib")) {
//       setFile(selectedFile);
//       setError(null);
//     } else {
//       setFile(null);
//       setError("Please upload a valid .bib file.");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       setError("No file selected.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const formData = new FormData();
//       formData.append("bibFile", file, file.name);

//       // Debug: Log FormData contents
//       console.log("FormData contents:");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, value);
//       }

//       const response = await axios.post(
//         "https://re-assist-backend.onrender.com/api/bib/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Server response:", response.data);
//       setSuccess(response.data.message);
//     } catch (error) {
//       console.error("Upload error:", error);
//       const errorMessage = error.response?.data?.error || 
//                          error.response?.data?.message || 
//                          error.message;
//       setError(errorMessage || "Upload failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold mb-6">Upload Your .bib File</h1>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
//             {success}
//           </div>
//         )}
        
//         <input
//           type="file"
//           accept=".bib"
//           onChange={handleFileChange}
//           className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
        
//         <button
//           onClick={handleSubmit}
//           disabled={loading || !file}
//           className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
//             loading || !file ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Processing..." : "Upload and Save Papers"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import bibtexParse from "bibtex-parse-js";

// const BibReader = () => {
//   const [bibData, setBibData] = useState(null);
//   const [error, setError] = useState("");

//   // Handle file upload
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const content = e.target.result;
//         const parsedData = bibtexParse.toJSON(content); // Parse .bib content
//         setBibData(parsedData);
//         setError("");
//       } catch (err) {
//         setError("Error parsing .bib file. Please ensure it is valid.");
//         setBibData(null);
//       }
//     };
//     reader.onerror = () => {
//       setError("Error reading the file.");
//     };
//     reader.readAsText(file);
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6">.bib File Reader</h1>
//       <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//         {/* File Input */}
//         <label
//           htmlFor="bib-file"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Upload your .bib file:
//         </label>
//         <input
//           type="file"
//           id="bib-file"
//           accept=".bib"
//           onChange={handleFileUpload}
//           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//         />
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>

//       {/* Display Parsed Data */}
//       {bibData && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Parsed Data:</h2>
//           <ul className="space-y-4">
//             {bibData.map((entry, index) => (
//               <li
//                 key={index}
//                 className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
//               >
//                 <h3 className="text-xl font-medium">
//                   {entry.entryTags.title || "Untitled"}
//                 </h3>
//                 <p className="text-gray-600">
//                   <strong>Author:</strong>{" "}
//                   {entry.entryTags.author || "Unknown Author"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Year:</strong> {entry.entryTags.year || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Journal/Booktitle:</strong>{" "}
//                   {entry.entryTags.journal || entry.entryTags.booktitle || "N/A"}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BibReader;

// import React, { useState } from "react";
// import bibtexParse from "bibtex-parse-js";

// const App = () => {
//   const [bibData, setBibData] = useState(null);
//   const [error, setError] = useState("");

//   // Handle file upload and parsing
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const content = e.target.result;
//         const parsedData = bibtexParse.toJSON(content); // Parse .bib content
//         setBibData(parsedData);
//         setError("");
//       } catch (err) {
//         setError("Error parsing .bib file. Please ensure it is valid.");
//         setBibData(null);
//       }
//     };
//     reader.onerror = () => {
//       setError("Error reading the file.");
//     };
//     reader.readAsText(file);
//   };

//   // Save bib data to the backend
//   const saveBibDataToBackend = async () => {
//     try {
//       const response = await fetch("https://re-assist-backend.onrender.com/api/bib", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ bibData }), // Send the parsed bibData
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("Bib data saved successfully!");
//       } else {
//         alert(`Error: ${result.message}`);
//       }
//     } catch (error) {
//       console.error("Error saving bib data:", error);
//       alert("Failed to save bib data. Please try again.");
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-center mb-6">.bib File Reader</h1>

//       {/* File Upload Section */}
//       <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//         <label
//           htmlFor="bib-file"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Upload your .bib file:
//         </label>
//         <input
//           type="file"
//           id="bib-file"
//           accept=".bib"
//           onChange={handleFileUpload}
//           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//         />
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>
//        <button
//             onClick={saveBibDataToBackend}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Save to Backend
//           </button>
//     </div>
//   );
// };

// export default App;