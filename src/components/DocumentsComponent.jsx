

// // File: src/components/DocumentsComponent.js
// import React, { useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Sidebar from "./Sidebar";

// export default function DocumentsComponent() {
//   const navigate = useNavigate();
//   const [showNewDocModal, setShowNewDocModal] = useState(false);
//   const [newDocName, setNewDocName] = useState("");
//   const [showProfileOptions, setShowProfileOptions] = useState(false);
//   const [newDocType, setNewDocType] = useState("Document");
//   const [documents, setDocuments] = useState([
//     { id: 1, name: "Research Proposal Template", type: "Template", lastModified: "April 2, 2025" },
//     { id: 2, name: "Literature Review Guidelines", type: "Guide", lastModified: "March 28, 2025" },
//     { id: 3, name: "AI Ethics Framework", type: "Document", lastModified: "April 8, 2025" }
//   ]);
  
//   const [activeCategory, setActiveCategory] = useState("All Documents");
//   const categories = ["All Documents", "Research Papers", "Notes", "Templates", "Guides"];
  
//   const [filteredDocuments, setFilteredDocuments] = useState([]);
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleDownload = async (url, filename) => {
//     try {
//       const response = await fetch(url);
//       const blob = await response.blob();
  
//       const blobUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
//     } catch (error) {
//       console.error("Download failed:", error);
//     }
//   };
  
  

//   useEffect(() => {
//     // Fetch papers when the component mounts
//     const fetchPapers = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get the JWT token
  
//         const response = await axios.get('https://re-assist-backend.onrender.com/api/projects', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token
//           },
//         });
  
//         const projects = response.data.projects;
//         console.log("projects data",projects)
//         // Normalize the data to ensure consistency
//         const normalizedProjects = projects.map((project) => ({
//           ...project,
//           papers: project.papers || [], // Ensure papers is always an array
//         }));
  
//         // Flatten the papers array across all projects
//         const allPapers = normalizedProjects.flatMap((project) =>
//           project.papers.map((paper) => ({
//             ...paper,
//             projectId: project._id, // Include the project ID for reference
//           }))
//         );
  
//         setPapers(allPapers);
//         console.log("projects data",allPapers)
//         setFilteredDocuments(allPapers); // Initially set to all papers
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching papers');
//         setLoading(false);
//         console.error('Error fetching papers:', error);
//       }
//     };
  
//     fetchPapers();
//   }, []);
  
//   useEffect(() => {
//     // Filter documents based on the active category
//     const filteredDocs =
//       activeCategory === "All Documents"
//         ? papers
//         : papers.filter((doc) => doc.type === activeCategory.slice(0, -1).trim());
  
//     setFilteredDocuments(filteredDocs);
//   }, [activeCategory, papers]);


//   // New state for showing document viewer and editing
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [showDocViewer, setShowDocViewer] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState("");
  
//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleNewDocument = () => {
//     setShowNewDocModal(true);
//   };

//   const handleProfileClick = () => {
//     setShowProfileOptions(false);
//     navigate("/dashboard/profile"); // Navigate to the profile page within dashboard
//   };



//   const handleCreateDocument = () => {
//     if (newDocName.trim() !== "") {
//       const currentDate = new Date();
//       const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
      
//       const newDoc = {
//         id: documents.length + 1,
//         name: newDocName,
//         type: newDocType,
//         lastModified: formattedDate
//       };
      
//       setDocuments([...documents, newDoc]);
//       setNewDocName("");
//       setNewDocType("Document");
//       setShowNewDocModal(false);
//     }
//   };

//   // Function to handle opening a document
//   const handleOpenDocument = (doc) => {
//     setSelectedDocument(doc);
//     setShowDocViewer(true);
//     // Initialize edit content with placeholder text
//     setEditedContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam euismod, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.");
//     setIsEditing(false);
//   };

//   // Function to close document viewer
//   const handleCloseViewer = () => {
//     setShowDocViewer(false);
//     setSelectedDocument(null);
//     setIsEditing(false);
//   };
  
//   // Function to handle edit mode
//   const handleEdit = () => {
//     setIsEditing(true);
//   };
  
//   // Function to save edited content
//   const handleSave = () => {
//     // In a real app, you would save the content to your backend
//     // For now, we'll just exit edit mode
//     setIsEditing(false);
    
//     // Update the document's last modified date
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    
//     // Update document in the documents array
//     const updatedDocuments = documents.map(doc => {
//       if (doc.id === selectedDocument.id) {
//         return { ...doc, lastModified: formattedDate };
//       }
//       return doc;
//     });
    
//     setDocuments(updatedDocuments);
//     setSelectedDocument({...selectedDocument, lastModified: formattedDate});
//   };
  
//   // Function to cancel editing
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
//       {/* Main Header with Navigation Tabs */}
//       <Sidebar />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Left sidebar */}
//         <div className="w-1/5 p-3 border-r border-gray-200 flex flex-col">
//           <div className="mb-4 flex-1">
//             <h2 className="text-lg font-semibold text-blue-700 mb-3">Document Library</h2>
//             <p className="text-sm text-gray-600 mb-3">Access and manage your research documents</p>
            
//             <div className="space-y-2">
//               <button 
//                 onClick={handleNewDocument}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md transition-colors text-sm"
//               >
//                 + New Document
//               </button>
//             </div>
          
//             <div className="mt-6">
//               <h3 className="text-sm font-medium text-blue-700 mb-2">Categories</h3>
//               <ul className="space-y-1">
//                 {categories.map((category) => (
//                   <li 
//                     key={category}
//                     className={`flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer ${
//                       activeCategory === category ? "text-blue-700 font-medium" : "text-gray-700"
//                     }`}
//                     onClick={() => setActiveCategory(category)}
//                   >
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
          
//           {/* Logout button at bottom with profile symbol */}
//           <div className="relative">
//             <button 
//               className="flex items-center justify-between w-full bg-white hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md transition-colors text-xs border border-gray-300"
//               onClick={() => setShowProfileOptions(prev => !prev)}
//             >
//               <div className="flex items-center">
//                 <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 text-white">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span>User</span>
//               </div>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
            
//             {/* Dropdown Menu */}
//             {showProfileOptions && (
//               <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-md shadow-lg border border-blue-200 overflow-hidden z-10">
//                 <button 
//                   className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
//                   onClick={handleProfileClick}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
//                   </svg>
//                   Profile
//                 </button>
//                 <button 
//                   className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
//                   onClick={() => {
//                     setShowProfileOptions(false);
//                     handleLogout();
//                   }}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                   </svg>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 p-3 overflow-y-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-blue-700">
//               {activeCategory}
//             </h2>
//             <div className="flex space-x-2">
//               <input 
//                 type="text" 
//                 placeholder="Search documents..." 
//                 className="bg-white text-gray-800 text-sm px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-md shadow-sm p-3">
//           {/* Header */}
//           <div className="grid grid-cols-4 text-sm font-semibold border-b border-gray-200 pb-2 mb-2 sticky top-0 bg-white">
//             <div>Name</div>
//             <div>Type</div>
//             <div>Modified</div>
//             <div>Action</div>
//           </div>

//           {/* Rows */}
//           {filteredDocuments.length > 0 ? (
//             filteredDocuments.map((doc, index) => (
//               <div
//                 key={index}
//                 className="grid grid-cols-4 text-sm py-2 px-1 hover:bg-gray-100 rounded transition-colors cursor-pointer items-center"
//               >
              
//                 <a href={doc.url} target="_blank" className=" hover:text-blue-600">{doc.title.replace(/\.[^/.]+$/, "")}</a>
//                 <div className="text-indigo-600">
//                   {doc.url ? doc.url.split('.').pop().toUpperCase() : "Unknown"}
//                 </div>
//                 <div className="text-gray-500">
//                   {new Date(doc.uploadedAt).toLocaleString()}
//                 </div>
//                 <div>
//                 <button
//                     onClick={() => handleDownload(doc.url, doc.title || "download.pdf")}
//                     className="text-blue-500 hover:underline"
//                   >
//                     Download
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-4 text-gray-400 text-sm">
//               No documents found in this category.
//             </div>
//           )}
//         </div>
//         </div>
//       </div>

//       {/* New Document Modal */}
//       {showNewDocModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
//           <div className="bg-white rounded-lg shadow-lg p-5 w-96">
//             <h3 className="text-lg font-semibold text-blue-700 mb-4">Create New Document</h3>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
//               <input 
//                 type="text" 
//                 value={newDocName}
//                 onChange={(e) => setNewDocName(e.target.value)}
//                 className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
//                 placeholder="Enter document name"
//               />
//             </div>
            
//             <div className="mb-5">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
//               <select 
//                 value={newDocType}
//                 onChange={(e) => setNewDocType(e.target.value)}
//                 className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
//               >
//                 <option value="Document">Document</option>
//                 <option value="Template">Template</option>
//                 <option value="Guide">Guide</option>
//                 <option value="Research Paper">Research Paper</option>
//                 <option value="Note">Note</option>
//               </select>
//             </div>
            
//             <div className="flex justify-end space-x-3">
//               <button 
//                 onClick={() => setShowNewDocModal(false)}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleCreateDocument}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Document Viewer Modal */}
//       {showDocViewer && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
//           <div className="bg-white rounded-lg shadow-lg w-4/5 h-4/5 flex flex-col">
//             {/* Header */}
//             <div className="flex justify-between items-center border-b border-gray-200 p-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-blue-700">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-500">{selectedDocument.type} • Last modified: {selectedDocument.lastModified}</p>
//               </div>
//               <button 
//                 onClick={handleCloseViewer}
//                 className="p-1 hover:bg-gray-100 rounded-full"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             {/* Document content */}
//             <div className="flex-1 p-5 overflow-auto">
//               {/* This is a placeholder for document content */}
//               <div className="p-4 bg-gray-50 rounded-md">
//                 <p className="text-gray-700 mb-4">
//                   This is the content of "{selectedDocument.name}". {isEditing ? "You are now editing this document." : "In a real application, this would display the actual document content."}
//                 </p>
//                 <div className="bg-white p-4 rounded-md shadow-sm">
//                   <h4 className="font-medium text-blue-700 mb-2">Document Content</h4>
//                   {isEditing ? (
//                     <textarea
//                       value={editedContent}
//                       onChange={(e) => setEditedContent(e.target.value)}
//                       className="w-full h-48 bg-gray-50 text-gray-800 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//                     />
//                   ) : (
//                     <p className="text-gray-600">
//                       {editedContent || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl."}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             {/* Footer with action buttons */}
//             <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
//               {isEditing ? (
//                 <>
//                   <button 
//                     onClick={handleCancelEdit}
//                     className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={handleSave}
//                     className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
//                   >
//                     Save Changes
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors">
//                     Download
//                   </button>
//                   <button 
//                     onClick={handleEdit}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
//                   >
//                     Edit
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Sidebar from "./Sidebar";

export default function DocumentsComponent() {
  const navigate = useNavigate();
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [newDocType, setNewDocType] = useState("Document");
  const [documents, setDocuments] = useState([
    { id: 1, name: "Research Proposal Template", type: "Template", lastModified: "April 2, 2025" },
    { id: 2, name: "Literature Review Guidelines", type: "Guide", lastModified: "March 28, 2025" },
    { id: 3, name: "AI Ethics Framework", type: "Document", lastModified: "April 8, 2025" }
  ]);
  const [activeCategory, setActiveCategory] = useState("All Documents");
  const categories = ["All Documents", "Research Papers", "Notes", "Templates", "Guides"];
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [papers, setPapers] = useState([]);
  const [projects, setProjects] = useState([]); // To store raw projects for dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active 3-dot dropdown
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [contextMenuId, setContextMenuId] = useState(null);
  const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setContextMenuId(null);
    }
  };

  // Listen only if either dropdown or context menu is open
  if (activeDropdown !== null || contextMenuId !== null) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [activeDropdown, contextMenuId]); // Now depends on both states

  const handleAttachClick = (id) => {
    setContextMenuId(null); // Close context menu
    setActiveDropdown(id);  // Open project selector dropdown
  };

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://re-assist-backend.onrender.com/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const projects = response.data.projects;

        const normalizedProjects = projects.map((project) => ({
          ...project,
          papers: project.papers || [],
        }));

        const allPapers = normalizedProjects.flatMap((project) =>
          project.papers.map((paper) => ({
            ...paper,
            projectId: project._id,
          }))
        );
        console.log("papers:",allPapers)
        setPapers(allPapers);
        setProjects(normalizedProjects); // Store projects for dropdown
        setFilteredDocuments(allPapers);
        setLoading(false);
      } catch (error) {
        setError('Error fetching papers');
        setLoading(false);
        console.error('Error fetching papers:', error);
      }
    };
    fetchPapers();
  }, []);

  useEffect(() => {
    const filteredDocs =
      activeCategory === "All Documents"
        ? papers
        : papers.filter((doc) => doc.type === activeCategory.slice(0, -1).trim());
    setFilteredDocuments(filteredDocs);
  }, [activeCategory, papers]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const handleLogout = () => {
    navigate("/");
  };

  const handleNewDocument = () => {
    setShowNewDocModal(true);
  };

  const handleProfileClick = () => {
    setShowProfileOptions(false);
    navigate("/dashboard/profile");
  };

  const handleCreateDocument = () => {
    if (newDocName.trim() !== "") {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
      const newDoc = {
        id: documents.length + 1,
        name: newDocName,
        type: newDocType,
        lastModified: formattedDate
      };
      setDocuments([...documents, newDoc]);
      setNewDocName("");
      setNewDocType("Document");
      setShowNewDocModal(false);
    }
  };

  const handleOpenDocument = (doc) => {
    setSelectedDocument(doc);
    setShowDocViewer(true);
    setEditedContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit...");
    setIsEditing(false);
  };

  const handleCloseViewer = () => {
    setShowDocViewer(false);
    setSelectedDocument(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    const updatedDocuments = documents.map(doc => {
      if (doc.id === selectedDocument.id) {
        return { ...doc, lastModified: formattedDate };
      }
      return doc;
    });
    setDocuments(updatedDocuments);
    setSelectedDocument({ ...selectedDocument, lastModified: formattedDate });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDotsClick = (id) => {
    setContextMenuId(contextMenuId === id ? null : id);
  };

  const handleAttachToProject = async (projectId, doc) => {
  
    // Proceed to upload and attach
    try {
      const token = localStorage.getItem('token');
  
      const uploadResponse = await fetch("https://re-assist-backend.onrender.com/api/papers/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: doc.title || "Untitled Paper",
          url: doc.url,
        }),
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }
  
      const uploadData = await uploadResponse.json();
      const uploadedPaper = uploadData.paper;
  
      const addPaperResponse = await fetch(
        `https://re-assist-backend.onrender.com/api/projects/${projectId}/add-paper`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paperId: uploadedPaper._id }),
        }
      );
  
      if (!addPaperResponse.ok) {
        const errData = await addPaperResponse.json();
        throw new Error(`Add paper failed: ${errData.message}`);
      }
  
      alert("Document attached successfully!");
      setActiveDropdown(null);
    } catch (error) {
      console.error("Failed to attach document:", error);
      alert("Failed to attach document.");
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-1/5 p-3 border-r border-gray-200 flex flex-col">
          <div className="mb-4 flex-1">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">Document Library</h2>
            <p className="text-sm text-gray-600 mb-3">Access and manage your research documents</p>
            <div className="space-y-2">
              <button 
                onClick={handleNewDocument}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md transition-colors text-sm"
              >
                + New Document
              </button>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Categories</h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li 
                    key={category}
                    className={`flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer ${
                      activeCategory === category ? "text-blue-700 font-medium" : "text-gray-700"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Logout button at bottom with profile symbol */}
          <div className="relative">
            <button 
              className="flex items-center justify-between w-full bg-white hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md transition-colors text-xs border border-gray-300"
              onClick={() => setShowProfileOptions(prev => !prev)}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>User</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown Menu */}
            {showProfileOptions && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-md shadow-lg border border-blue-200 overflow-hidden z-10">
                <button 
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
                  onClick={handleProfileClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  Profile
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
                  onClick={() => {
                    setShowProfileOptions(false);
                    handleLogout();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-700">{activeCategory}</h2>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="bg-white text-gray-800 text-sm px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="bg-white rounded-md shadow-sm p-3">
            {/* Header */}
            <div className="grid grid-cols-4 text-sm font-semibold border-b border-gray-200 pb-2 mb-2 sticky top-0 bg-white">
              <div>Name</div>
              <div>Type</div>
              <div>Modified</div>
              <div>Action</div>
            </div>
            {/* Rows */}
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 text-sm py-2 px-1 hover:bg-gray-100 ${
                      activeDropdown === (doc._id || doc.id) ? "bg-gray-200 rounded-md" : ""
                    } rounded transition-colors cursor-pointer items-center`}
                >
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {doc.title.replace(/\.[^/.]+$/, "")}
                  </a>
                  <div className="text-indigo-600">
                    {doc.url ? doc.url.split('.').pop().toUpperCase() : "Unknown"}
                  </div>
                  <div className="text-gray-500">
                    {new Date(doc.uploadedAt).toLocaleString()}
                  </div>
                  <div className="relative">
                  <button
      onClick={() => handleDotsClick(doc._id || doc.id)}
      className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <circle cx="4" cy="10" r="1.5" />
        <circle cx="10" cy="10" r="1.5" />
        <circle cx="16" cy="10" r="1.5" />
      </svg>
    </button>

    {/* Context Menu Dropdown */}
    {contextMenuId === (doc._id || doc.id) && (
      <div
        ref={dropdownRef}
        className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10 py-1 text-sm"
      >
        <button
          onClick={() => {
            // Handle delete logic
            console.log("Delete document:", doc._id || doc.id);
          }}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Delete
        </button>

        <button
          onClick={() => handleAttachClick(doc._id || doc.id)}
          className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
        >
          Attach to Project
        </button>
      </div>
    )}

    {/* Attach to Project Dropdown */}
    {activeDropdown === (doc._id || doc.id) && (
      <div
        ref={dropdownRef}
        className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10 py-1 text-sm"
      >
        <div className="p-2 space-y-2">
          <label className="block text-xs font-medium text-gray-600">Select Project</label>
          <select
            value={selectedProjectId || ""}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- Select a Project --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (selectedProjectId && doc) {
                handleAttachToProject(selectedProjectId, doc);
                setActiveDropdown(null); // Close after saving
              } else {
                alert("Please select a project.");
              }
            }}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400 text-sm">
                No documents found in this category.
              </div>
            )}
          </div>
        </div>
      </div>

  {/* New Document Modal */}
  {showNewDocModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Create New Document</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
              <input 
                type="text" 
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter document name"
              />
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
              <select 
                value={newDocType}
                onChange={(e) => setNewDocType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Document">Document</option>
                <option value="Template">Template</option>
                <option value="Guide">Guide</option>
                <option value="Research Paper">Research Paper</option>
                <option value="Note">Note</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowNewDocModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateDocument}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {showDocViewer && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg w-4/5 h-4/5 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{selectedDocument.name}</h3>
                <p className="text-sm text-gray-500">{selectedDocument.type} • Last modified: {selectedDocument.lastModified}</p>
              </div>
              <button 
                onClick={handleCloseViewer}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Document content */}
            <div className="flex-1 p-5 overflow-auto">
              {/* This is a placeholder for document content */}
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700 mb-4">
                  This is the content of "{selectedDocument.name}". {isEditing ? "You are now editing this document." : "In a real application, this would display the actual document content."}
                </p>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-blue-700 mb-2">Document Content</h4>
                  {isEditing ? (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-48 bg-gray-50 text-gray-800 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {editedContent || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl."}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer with action buttons */}
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors">
                    Download
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}