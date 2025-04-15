// File: src/components/ConferencesComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ConferencesComponent() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All Conferences");
  const [showAddForm, setShowAddForm] = useState(false);
  
  const conferences = [
    { 
      name: "International Conference on Machine Learning", 
      date: "July 23-29, 2025", 
      location: "Vienna, Austria",
      type: "Machine Learning",
      submission: "February 15, 2025",
      notification: "May 1, 2025",
      website: "https://icml.cc"
    },
    { 
      name: "Neural Information Processing Systems", 
      date: "December 5-12, 2025", 
      location: "Montreal, Canada",
      type: "Machine Learning",
      submission: "May 22, 2025",
      notification: "September 10, 2025",
      website: "https://nips.cc"
    },
    { 
      name: "ACM Conference on AI Ethics", 
      date: "September 15-18, 2025", 
      location: "San Francisco, USA",
      type: "AI Ethics",
      submission: "April 1, 2025",
      notification: "June 15, 2025",
      website: "https://aiethics.acm.org"
    },
    { 
      name: "International Conference on Robotics and Automation", 
      date: "May 30 - June 5, 2025", 
      location: "Tokyo, Japan",
      type: "Robotics",
      submission: "October 15, 2024",
      notification: "January 15, 2025",
      website: "https://icra2025.org"
    },
    { 
      name: "Conference on Computer Vision and Pattern Recognition", 
      date: "June 18-22, 2025", 
      location: "Seattle, USA",
      type: "Computer Vision",
      submission: "November 10, 2024",
      notification: "March 5, 2025",
      website: "https://cvpr2025.thecvf.com"
    },
    { 
      name: "European Conference on Artificial Intelligence", 
      date: "August 25-29, 2025", 
      location: "Amsterdam, Netherlands",
      type: "Artificial Intelligence",
      submission: "February 28, 2025",
      notification: "May 20, 2025",
      website: "https://ecai2025.eu"
    }
  ];

  const types = ["All Conferences", "Machine Learning", "AI Ethics", "Robotics", "Computer Vision", "Artificial Intelligence"];

  const filteredConferences = activeFilter === "All Conferences" 
    ? conferences 
    : conferences.filter(conf => conf.type === activeFilter);

  const [selectedConference, setSelectedConference] = useState(null);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - for Conferences */}
        <div className="w-1/5 p-3 border-r border-indigo-900 bg-gray-900 flex flex-col">
          <div className="mb-3 flex-1">
            <h2 className="text-lg font-semibold text-indigo-300 mb-2">Conference Explorer</h2>
            <p className="text-xs text-gray-400 mb-3">Keep track of important academic events</p>
            
            <div className="space-y-2">
              <button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md transition-colors text-xs"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "Cancel" : "+ Add Conference"}
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-1.5 rounded-md transition-colors text-xs">
                Set Deadline Alerts
              </button>
            </div>

            {showAddForm && (
              <div className="mt-3 p-2 bg-gray-800 rounded-md">
                <h3 className="text-xs font-medium text-indigo-300 mb-1">Add New Conference</h3>
                <div className="space-y-2">
                  <input 
                    className="w-full bg-gray-700 text-white p-1.5 rounded-md text-xs border border-gray-600 focus:border-indigo-500 focus:outline-none"
                    placeholder="Conference name"
                  />
                  <input 
                    className="w-full bg-gray-700 text-white p-1.5 rounded-md text-xs border border-gray-600 focus:border-indigo-500 focus:outline-none"
                    placeholder="Date (e.g., July 10-15, 2025)"
                  />
                  <input 
                    className="w-full bg-gray-700 text-white p-1.5 rounded-md text-xs border border-gray-600 focus:border-indigo-500 focus:outline-none"
                    placeholder="Location"
                  />
                  <select className="w-full bg-gray-700 text-white p-1.5 rounded-md text-xs border border-gray-600 focus:border-indigo-500 focus:outline-none">
                    <option value="">Select category</option>
                    {types.filter(t => t !== "All Conferences").map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md text-xs transition-colors">
                    Save Conference
                  </button>
                </div>
              </div>
            )}
          
            <div className="mt-4">
              <h3 className="text-xs font-medium text-indigo-300 mb-1">Filter By</h3>
              <ul className="space-y-1">
                {types.map((category) => (
                  <li 
                    key={category}
                    className={`flex items-center px-2 py-0.5 text-xs rounded cursor-pointer ${
                      activeFilter === category 
                        ? "bg-indigo-900 text-indigo-200" 
                        : "hover:bg-gray-800 text-gray-300"
                    }`}
                    onClick={() => setActiveFilter(category)}
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
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-indigo-300">
              {activeFilter === "All Conferences" ? "All Conferences" : `${activeFilter} Conferences`}
            </h2>
            <div className="flex space-x-2">
              <select className="bg-gray-800 text-white p-1 rounded-md text-xs border border-gray-700 focus:border-indigo-500 focus:outline-none">
                <option>Sort by Date</option>
                <option>Sort by Name</option>
                <option>Sort by Submission Deadline</option>
              </select>
              {/* <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded-md transition-colors text-xs"
                onClick={() => setShowAddForm(true)}
              >
                + Add
              </button> */}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredConferences.map((conf, index) => (
              <div 
                key={index} 
                className="bg-gray-800 p-3 rounded-md hover:border hover:border-indigo-500 transition-colors cursor-pointer"
                onClick={() => setSelectedConference(conf)}
              >
                <div className="font-semibold text-md text-indigo-300">{conf.name}</div>
                <div className="text-gray-400 mt-1 text-sm">{conf.date}</div>
                <div className="text-indigo-400 mt-1 text-sm">{conf.location}</div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded">
                    {conf.type}
                  </span>
                  <button 
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-0.5 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Added ${conf.name} to your tracked conferences`);
                    }}
                  >
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel - Conference details */}
        <div className="w-1/5 p-3 border-l border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
          {selectedConference ? (
            <>
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-indigo-300 text-sm">Conference Details</div>
                <button 
                  className="text-white text-xs bg-gray-700 p-0.5 rounded"
                  onClick={() => setSelectedConference(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                <div className="bg-gray-800 p-2 rounded-md">
                  <h3 className="font-semibold text-md mb-1 text-indigo-300">{selectedConference.name}</h3>
                  <p className="text-xs text-indigo-200">{selectedConference.type}</p>
                  
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white">{selectedConference.date}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{selectedConference.location}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Submission:</span>
                      <span className="text-white">{selectedConference.submission}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Notification:</span>
                      <span className="text-white">{selectedConference.notification}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Website:</span>
                      <a 
                        href={selectedConference.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Visit site
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 rounded-md text-xs transition-colors">
                      Track This Conference
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-1 rounded-md text-xs transition-colors">
                      Set Submission Reminder
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 p-2 rounded-md">
                  <h3 className="font-semibold text-xs mb-1 text-indigo-300">Related Conferences</h3>
                  <ul className="space-y-1 text-xs">
                    {conferences
                      .filter(conf => conf.type === selectedConference.type && conf.name !== selectedConference.name)
                      .slice(0, 3)
                      .map((conf, idx) => (
                        <li 
                          key={idx} 
                          className="p-1 hover:bg-gray-700 rounded cursor-pointer"
                          onClick={() => setSelectedConference(conf)}
                        >
                          <div className="font-medium text-white">{conf.name}</div>
                          <div className="text-xs text-gray-400">{conf.date}</div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-indigo-300 text-sm">Conference Calendar</div>
                <button className="text-white text-xs bg-gray-700 p-0.5 rounded">⚙️</button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                <div className="bg-gray-800 p-2 rounded-md">
                  <h3 className="font-semibold text-xs mb-1 text-indigo-300">Upcoming Deadlines</h3>
                  <ul className="space-y-1 text-xs">
                    {conferences
                      .sort((a, b) => new Date(a.submission) - new Date(b.submission))
                      .slice(0, 4)
                      .map((conf, idx) => (
                        <li 
                          key={idx} 
                          className="p-1 hover:bg-gray-700 rounded cursor-pointer"
                          onClick={() => setSelectedConference(conf)}
                        >
                          <div className="font-medium text-white">{conf.name}</div>
                          <div className="flex justify-between mt-0.5">
                            <span className="text-gray-400">Submission:</span>
                            <span className="text-indigo-400">{conf.submission}</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>

                <div className="bg-gray-800 p-2 rounded-md">
                  <h3 className="font-semibold text-xs mb-1 text-indigo-300">Conference Tips</h3>
                  <ul className="text-xs space-y-1 text-gray-300">
                    <li>• Start preparing your submission at least 2 months before the deadline</li>
                    <li>• Check formatting requirements early to avoid last-minute issues</li>
                    <li>• Consider presenting preliminary results at workshops</li>
                    <li>• Plan travel and accommodation early for better rates</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}