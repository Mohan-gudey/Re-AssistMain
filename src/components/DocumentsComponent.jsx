// File: src/components/DocumentsComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DocumentsComponent() {
  const navigate = useNavigate();
  
  const documents = [
    { name: "Research Proposal Template", type: "Template", lastModified: "April 2, 2025" },
    { name: "Literature Review Guidelines", type: "Guide", lastModified: "March 28, 2025" },
    { name: "AI Ethics Framework", type: "Document", lastModified: "April 8, 2025" }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - simplified in this version */}
        <div className="w-1/4 p-4 border-r border-indigo-900 bg-gray-900">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-indigo-300 mb-3">Document Library</h2>
            <p className="text-sm text-gray-400 mb-4">Access and manage your research documents</p>
            
            <div className="space-y-2">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors">
                + Create New Document
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition-colors">
                Upload Document
              </button>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-indigo-300 mb-2">Categories</h3>
            <ul className="space-y-1">
              {["All Documents", "Research Papers", "Notes", "Templates", "Guides"].map((category) => (
                <li 
                  key={category}
                  className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-800 cursor-pointer"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          
          <button 
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-auto w-full"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-300">Document Management</h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors">
              + New Document
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-md p-3">
            <div className="flex justify-between text-sm font-semibold border-b border-gray-700 pb-2 mb-2 sticky top-0 bg-gray-800">
              <div className="w-1/2">Name</div>
              <div className="w-1/4">Type</div>
              <div className="w-1/4">Modified</div>
            </div>
            
            {documents.map((doc, index) => (
              <div key={index} className="flex justify-between text-sm py-2 hover:bg-gray-700 rounded px-1 transition-colors">
                <div className="w-1/2 truncate">{doc.name}</div>
                <div className="w-1/4 text-indigo-300">{doc.type}</div>
                <div className="w-1/4 text-gray-400">{doc.lastModified}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

