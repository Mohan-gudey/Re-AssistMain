// File: src/components/DocumentsComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DocumentsComponent() {
  const navigate = useNavigate();
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [newDocType, setNewDocType] = useState("Document");
  const [documents, setDocuments] = useState([
    { name: "Research Proposal Template", type: "Template", lastModified: "April 2, 2025" },
    { name: "Literature Review Guidelines", type: "Guide", lastModified: "March 28, 2025" },
    { name: "AI Ethics Framework", type: "Document", lastModified: "April 8, 2025" }
  ]);
  
  const [activeCategory, setActiveCategory] = useState("All Documents");
  const categories = ["All Documents", "Research Papers", "Notes", "Templates", "Guides"];
  
  const handleLogout = () => {
    navigate("/");
  };

  const handleNewDocument = () => {
    setShowNewDocModal(true);
  };

  const handleCreateDocument = () => {
    if (newDocName.trim() !== "") {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
      
      const newDoc = {
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

  const filteredDocuments = activeCategory === "All Documents" 
    ? documents 
    : documents.filter(doc => doc.type === activeCategory.slice(0, -1).trim());

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-1/5 p-3 border-r border-indigo-900 bg-gray-900 flex flex-col">
          <div className="mb-4 flex-1">
            <h2 className="text-lg font-semibold text-indigo-300 mb-3">Document Library</h2>
            <p className="text-sm text-gray-400 mb-3">Access and manage your research documents</p>
            
            <div className="space-y-2">
              <button 
                onClick={handleNewDocument}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md transition-colors text-sm"
              >
                + New Document
              </button>
            </div>
          
            <div className="mt-6">
              <h3 className="text-sm font-medium text-indigo-300 mb-2">Categories</h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li 
                    key={category}
                    className={`flex items-center px-2 py-1 text-xs rounded hover:bg-gray-800 cursor-pointer ${
                      activeCategory === category ? "bg-gray-800 text-indigo-300" : ""
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
          <div className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md transition-colors text-xs">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span>User</span>
            </div>
            <button onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 overflow-y-auto bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-indigo-300">
              {activeCategory}
            </h2>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-md p-3">
            <div className="flex justify-between text-sm font-semibold border-b border-gray-700 pb-2 mb-2 sticky top-0 bg-gray-800">
              <div className="w-1/2">Name</div>
              <div className="w-1/4">Type</div>
              <div className="w-1/4">Modified</div>
            </div>
            
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc, index) => (
                <div key={index} className="flex justify-between text-sm py-2 hover:bg-gray-700 rounded px-1 transition-colors cursor-pointer">
                  <div className="w-1/2 truncate">{doc.name}</div>
                  <div className="w-1/4 text-indigo-300">{doc.type}</div>
                  <div className="w-1/4 text-gray-400">{doc.lastModified}</div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-5 w-96">
            <h3 className="text-lg font-semibold text-indigo-300 mb-4">Create New Document</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Document Name</label>
              <input 
                type="text" 
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Enter document name"
              />
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-1">Document Type</label>
              <select 
                value={newDocType}
                onChange={(e) => setNewDocType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-indigo-500"
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
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateDocument}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}