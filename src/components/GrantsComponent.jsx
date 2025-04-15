// File: src/components/GrantsComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function GrantsComponent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const grants = [
    { title: "NSF AI Research Grant", deadline: "May 15, 2025", amount: "$500,000" },
    { title: "NIH Medical AI Innovation", deadline: "June 30, 2025", amount: "$750,000" },
    { title: "DOE Energy Systems AI", deadline: "July 10, 2025", amount: "$1,200,000" },
    { title: "Gates Foundation Global Health AI", deadline: "August 5, 2025", amount: "$950,000" },
    { title: "Microsoft Research AI Ethics", deadline: "September 12, 2025", amount: "$350,000" },
    { title: "European Research Council AI Grant", deadline: "October 30, 2025", amount: "€800,000" }
  ];

  const filteredGrants = searchQuery.trim() === "" 
    ? grants 
    : grants.filter(grant => 
        grant.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - for Grants */}
        <div className="w-1/4 p-4 border-r border-indigo-900 bg-gray-900">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-indigo-300 mb-3">Grant Finder</h2>
            <p className="text-sm text-gray-400 mb-4">Discover and track research funding opportunities</p>
            
            <div className="space-y-2">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors">
                + Track New Grant
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition-colors">
                Set Notifications
              </button>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-indigo-300 mb-2">Categories</h3>
            <ul className="space-y-1">
              {["All Grants", "Federal", "Foundation", "University", "Industry", "International"].map((category) => (
                <li 
                  key={category}
                  className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-800 cursor-pointer"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-indigo-300 mb-2">Deadline</h3>
            <ul className="space-y-1">
              {["All Deadlines", "Next 30 Days", "Next 90 Days", "Next 6 Months"].map((deadline) => (
                <li 
                  key={deadline}
                  className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-800 cursor-pointer"
                >
                  {deadline}
                </li>
              ))}
            </ul>
          </div>
          
          <button 
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-8 w-full"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-300">Research Grants</h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors">
              + Track New Grant
            </button>
          </div>
          
          <input
            className="w-full bg-gray-800 text-white p-2 rounded-md mb-4 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
            placeholder="Search grants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGrants.map((grant, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md hover:border hover:border-indigo-500 transition-colors">
                <div className="font-semibold text-lg text-indigo-300">{grant.title}</div>
                <div className="flex justify-between mt-3">
                  <div className="text-gray-400">Deadline: {grant.deadline}</div>
                  <div className="text-indigo-400 font-semibold">{grant.amount}</div>
                </div>
                <div className="flex mt-4 space-x-2">
                  <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 text-sm rounded-md transition-colors">
                    View Details
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 text-sm rounded-md transition-colors">
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredGrants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No grants matching your search criteria.</p>
              <button 
                className="mt-2 text-indigo-400 hover:text-indigo-300"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Right panel - Grant recommendations */}
        <div className="w-1/4 p-4 border-l border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
          <div className="flex justify-between items-center mb-3">
            <div className="font-semibold text-indigo-300">Recommendations</div>
            <button className="text-white text-sm bg-gray-700 p-1 rounded">⚙️</button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <div className="bg-gray-800 p-3 rounded-md">
              <h3 className="font-semibold text-sm mb-2 text-indigo-300">Grants for You</h3>
              <p className="text-xs text-gray-400 mb-3">Based on your research interests</p>
              
              <ul className="space-y-3">
                {["DARPA Explainable AI Initiative", "Google Research Scholar Program", "Amazon Science Research Awards"].map((grant, idx) => (
                  <li 
                    key={idx} 
                    className="text-sm p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
                  >
                    {grant}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-3 rounded-md">
              <h3 className="font-semibold text-sm mb-2 text-indigo-300">Upcoming Deadlines</h3>
              <ul className="space-y-2 text-xs">
                {[
                  { name: "NSF CAREER Award", date: "April 25, 2025" },
                  { name: "Sloan Research Fellowship", date: "May 10, 2025" },
                  { name: "AAAI Grant Program", date: "May 22, 2025" }
                ].map((deadline, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="text-gray-300">{deadline.name}</span>
                    <span className="text-indigo-400">{deadline.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-3 rounded-md">
              <h3 className="font-semibold text-sm mb-2 text-indigo-300">Grant Writing Tips</h3>
              <ul className="text-xs space-y-2 text-gray-300">
                <li>• Focus on clear, measurable objectives</li>
                <li>• Emphasize the innovation and impact</li>
                <li>• Address potential challenges and solutions</li>
                <li>• Ensure budget is realistic and justified</li>
              </ul>
              <button className="mt-2 text-indigo-400 text-xs hover:text-indigo-300">
                View all tips →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}