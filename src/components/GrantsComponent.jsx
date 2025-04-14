import React from "react";
import { useNavigate } from "react-router-dom";

export default function GrantsComponent() {
  const navigate = useNavigate();
  
  const grants = [
    { title: "NSF AI Research Grant", deadline: "May 15, 2025", amount: "$500,000" },
    { title: "NIH Medical AI Innovation", deadline: "June 30, 2025", amount: "$750,000" },
    { title: "DOE Energy Systems AI", deadline: "July 10, 2025", amount: "$1,200,000" }
  ];

  const tabs = ["Chats", "Documents", "Grants", "Conferences", "Help"];
  const navigateToTab = (tab) => {
    const routes = {
      "Chats": "/",
      "Documents": "/documents",
      "Grants": "/grants",
      "Conferences": "/conferences",
      "Help": "/help"
    };
    navigate(routes[tab]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Main Header */}
      <div className="bg-indigo-950 p-4 border-b border-indigo-800">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-indigo-300">Re-Assist</div>
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md ${
                  tab === "Grants"
                    ? "bg-indigo-600 font-semibold"
                    : "hover:bg-indigo-900 text-indigo-200"
                }`}
                onClick={() => navigateToTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-32">
            {/* Empty div for balance */}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - simplified for Grants */}
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
              {["All Grants", "Federal", "Foundation", "University", "Industry"].map((category) => (
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
            <h2 className="text-xl font-semibold text-indigo-300">Research Grants</h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors">
              + Track New Grant
            </button>
          </div>
          
          <input
            className="w-full bg-gray-800 text-white p-2 rounded-md mb-4 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
            placeholder="Search grants..."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grants.map((grant, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md">
                <div className="font-semibold text-lg text-indigo-300">{grant.title}</div>
                <div className="flex justify-between mt-3">
                  <div className="text-gray-400">Deadline: {grant.deadline}</div>
                  <div className="text-indigo-400 font-semibold">{grant.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}