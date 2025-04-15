// File: src/components/GrantsComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function GrantsComponent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Grants");
  const [selectedDeadline, setSelectedDeadline] = useState("All Deadlines");
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [trackedGrants, setTrackedGrants] = useState([]);
  const [notifications, setNotifications] = useState({
    email: true,
    deadline: true,
    newGrants: true,
    frequency: "weekly"
  });
  
  const grants = [
    { 
      id: 1,
      title: "NSF AI Research Grant", 
      deadline: "May 15, 2025", 
      amount: "$500,000",
      category: "Federal",
      description: "Supports innovative research in artificial intelligence with applications in critical domains.",
      eligibility: "Open to tenure-track faculty and research scientists at accredited US institutions.",
      website: "https://nsf.gov/ai-research"
    },
    { 
      id: 2,
      title: "NIH Medical AI Innovation", 
      deadline: "June 30, 2025", 
      amount: "$750,000",
      category: "Federal",
      description: "Funding for AI applications in healthcare diagnostics, treatment planning, and personalized medicine.",
      eligibility: "US-based researchers with MD or PhD in relevant fields.",
      website: "https://nih.gov/medical-ai"
    },
    { 
      id: 3,
      title: "DOE Energy Systems AI", 
      deadline: "July 10, 2025", 
      amount: "$1,200,000",
      category: "Federal",
      description: "Research funding for AI applications in energy grid optimization, renewable integration, and climate modeling.",
      eligibility: "US research institutions and national laboratories.",
      website: "https://energy.gov/ai-grants"
    },
    { 
      id: 4,
      title: "Gates Foundation Global Health AI", 
      deadline: "August 5, 2025", 
      amount: "$950,000",
      category: "Foundation",
      description: "Supports AI research addressing global health challenges in underserved regions.",
      eligibility: "Open to researchers worldwide with focus on low and middle income countries.",
      website: "https://gatesfoundation.org/health-ai"
    },
    { 
      id: 5,
      title: "Microsoft Research AI Ethics", 
      deadline: "September 12, 2025", 
      amount: "$350,000",
      category: "Industry",
      description: "Funding for research on ethical frameworks, bias detection, and responsible AI deployment.",
      eligibility: "Open to academic researchers and independent research organizations.",
      website: "https://microsoft.com/research/ai-ethics"
    },
    { 
      id: 6,
      title: "European Research Council AI Grant", 
      deadline: "October 30, 2025", 
      amount: "€800,000",
      category: "International",
      description: "Supports groundbreaking AI research from European research institutions.",
      eligibility: "Researchers affiliated with institutions in EU member states or associated countries.",
      website: "https://erc.europa.eu/ai-grants"
    }
  ];

  // Calculate days to deadline
  const calculateDaysToDeadline = (deadlineStr) => {
    const [month, day, year] = deadlineStr.split(' ')[0].split(',')[0].split(' ');
    const months = {
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };
    
    const deadlineDate = new Date(year, months[month], parseInt(day));
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter grants by search, category, and deadline
  const filterGrants = () => {
    let filtered = grants;
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(grant => 
        grant.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    // Filter by category
    if (selectedCategory !== "All Grants") {
      filtered = filtered.filter(grant => grant.category === selectedCategory);
    }
    
    // Filter by deadline
    if (selectedDeadline !== "All Deadlines") {
      const today = new Date();
      
      if (selectedDeadline === "Next 30 Days") {
        filtered = filtered.filter(grant => {
          const days = calculateDaysToDeadline(grant.deadline);
          return days >= 0 && days <= 30;
        });
      } else if (selectedDeadline === "Next 90 Days") {
        filtered = filtered.filter(grant => {
          const days = calculateDaysToDeadline(grant.deadline);
          return days >= 0 && days <= 90;
        });
      } else if (selectedDeadline === "Next 6 Months") {
        filtered = filtered.filter(grant => {
          const days = calculateDaysToDeadline(grant.deadline);
          return days >= 0 && days <= 182;
        });
      }
    }
    
    return filtered;
  };

  const filteredGrants = filterGrants();

  const handleLogout = () => {
    navigate("/");
  };

  const handleTrackGrant = (grant) => {
    if (!trackedGrants.some(g => g.id === grant.id)) {
      setTrackedGrants([...trackedGrants, grant]);
    }
    setShowTrackModal(false);
  };

  const handleViewDetails = (grant) => {
    setSelectedGrant(grant);
    setShowDetailsModal(true);
  };

  const handleQuickTrack = (grant) => {
    if (!trackedGrants.some(g => g.id === grant.id)) {
      setTrackedGrants([...trackedGrants, grant]);
      // Show brief success message (in real app, this would be a toast)
      alert(`Now tracking: ${grant.title}`);
    }
  };

  const categories = ["All Grants", "Federal", "Foundation", "University", "Industry", "International"];
  const deadlines = ["All Deadlines", "Next 30 Days", "Next 90 Days", "Next 6 Months"];

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - for Grants */}
        <div className="w-1/5 p-3 border-r border-indigo-900 bg-gray-900 flex flex-col">
          <div className="flex-1 mb-3">
            <h2 className="text-lg font-semibold text-indigo-300 mb-2">Grant Finder</h2>
            <p className="text-xs text-gray-400 mb-3">Discover and track research funding opportunities</p>
            
            <div className="space-y-2">
              <button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md transition-colors text-xs"
                onClick={() => setShowTrackModal(true)}
              >
                + Track New Grant
              </button>
              <button 
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-1.5 rounded-md transition-colors text-xs"
                onClick={() => setShowNotificationModal(true)}
              >
                Set Notifications
              </button>
            </div>
          
            <div className="mt-6">
              <h3 className="text-xs font-medium text-indigo-300 mb-1">Categories</h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li 
                    key={category}
                    className={`flex items-center px-2 py-0.5 text-xs rounded hover:bg-gray-800 cursor-pointer ${
                      selectedCategory === category ? "bg-gray-800 text-indigo-300" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xs font-medium text-indigo-300 mb-1">Deadline</h3>
              <ul className="space-y-1">
                {deadlines.map((deadline) => (
                  <li 
                    key={deadline}
                    className={`flex items-center px-2 py-0.5 text-xs rounded hover:bg-gray-800 cursor-pointer ${
                      selectedDeadline === deadline ? "bg-gray-800 text-indigo-300" : ""
                    }`}
                    onClick={() => setSelectedDeadline(deadline)}
                  >
                    {deadline}
                  </li>
                ))}
              </ul>
            </div>

            {trackedGrants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-medium text-indigo-300 mb-1">Tracked Grants ({trackedGrants.length})</h3>
                <ul className="space-y-1 max-h-32 overflow-y-auto">
                  {trackedGrants.map((grant) => (
                    <li 
                      key={grant.id}
                      className="flex items-center justify-between px-2 py-1 text-xs rounded bg-gray-800"
                    >
                      <span className="truncate pr-1">{grant.title}</span>
                      <button 
                        className="text-gray-500 hover:text-gray-300"
                        onClick={() => setTrackedGrants(trackedGrants.filter(g => g.id !== grant.id))}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              {selectedCategory}{selectedCategory === "All Grants" ? "" : " Grants"}
              {selectedDeadline !== "All Deadlines" ? ` (${selectedDeadline})` : ""}
            </h2>
            
            <div className="text-xs text-gray-400">
              Showing {filteredGrants.length} result{filteredGrants.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <input
            className="w-full bg-gray-800 text-white p-2 rounded-md mb-3 border border-indigo-800 focus:border-indigo-500 focus:outline-none text-sm"
            placeholder="Search grants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredGrants.map((grant, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-md hover:border hover:border-indigo-500 transition-colors">
                <div className="font-semibold text-md text-indigo-300">{grant.title}</div>
                <div className="text-xs text-gray-400 mt-1">{grant.category}</div>
                <div className="flex justify-between mt-2">
                  <div className="text-gray-400 text-sm">Deadline: {grant.deadline}</div>
                  <div className="text-indigo-400 font-semibold text-sm">{grant.amount}</div>
                </div>
                <div className="flex mt-3 space-x-2">
                  <button 
                    className="bg-indigo-600 hover:bg-indigo-700 px-2 py-1 text-xs rounded-md transition-colors"
                    onClick={() => handleViewDetails(grant)}
                  >
                    View Details
                  </button>
                  <button 
                    className="bg-gray-700 hover:bg-gray-600 px-2 py-1 text-xs rounded-md transition-colors"
                    onClick={() => handleQuickTrack(grant)}
                  >
                    {trackedGrants.some(g => g.id === grant.id) ? "Tracked" : "Track"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredGrants.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-400 text-sm">No grants matching your search criteria.</p>
              <button 
                className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Grants");
                  setSelectedDeadline("All Deadlines");
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Right panel - Grant recommendations */}
        <div className="w-1/5 p-3 border-l border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-indigo-300 text-sm">Recommendations</div>
            <button className="text-white text-xs bg-gray-700 p-0.5 rounded">⚙️</button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <div className="bg-gray-800 p-2 rounded-md">
              <h3 className="font-semibold text-xs mb-1 text-indigo-300">Grants for You</h3>
              <p className="text-xs text-gray-400 mb-2">Based on your research interests</p>
              
              <ul className="space-y-2">
                {["DARPA Explainable AI Initiative", "Google Research Scholar Program", "Amazon Science Research Awards"].map((grant, idx) => (
                  <li 
                    key={idx} 
                    className="text-xs p-1.5 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
                  >
                    {grant}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-2 rounded-md">
              <h3 className="font-semibold text-xs mb-1 text-indigo-300">Upcoming Deadlines</h3>
              <ul className="space-y-1 text-xs">
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

            <div className="bg-gray-800 p-2 rounded-md">
              <h3 className="font-semibold text-xs mb-1 text-indigo-300">Grant Writing Tips</h3>
              <ul className="text-xs space-y-1 text-gray-300">
                <li>• Focus on clear, measurable objectives</li>
                <li>• Emphasize the innovation and impact</li>
                <li>• Address potential challenges and solutions</li>
                <li>• Ensure budget is realistic and justified</li>
              </ul>
              <button className="mt-1 text-indigo-400 text-xs hover:text-indigo-300">
                View all tips →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Track New Grant Modal */}
      {showTrackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-indigo-300 text-lg font-semibold mb-3">Track External Grant</h3>
            <p className="text-sm text-gray-400 mb-4">Enter details of a grant not listed in our database</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Grant Title</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-sm text-white"
                  placeholder="Enter grant title"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Funding Agency</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-sm text-white"
                  placeholder="Enter funding agency"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Application Deadline</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Grant URL (optional)</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-sm text-white"
                  placeholder="https://"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                onClick={() => setShowTrackModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded text-sm"
                onClick={() => setShowTrackModal(false)}
              >
                Add Grant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-indigo-300 text-lg font-semibold mb-3">Notification Settings</h3>
            <p className="text-sm text-gray-400 mb-4">Configure how you want to be notified about grants</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Email Notifications</label>
                <input 
                  type="checkbox" 
                  checked={notifications.email}
                  onChange={() => setNotifications({...notifications, email: !notifications.email})}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Deadline Reminders</label>
                <input 
                  type="checkbox" 
                  checked={notifications.deadline}
                  onChange={() => setNotifications({...notifications, deadline: !notifications.deadline})}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">New Grant Alerts</label>
                <input 
                  type="checkbox" 
                  checked={notifications.newGrants}
                  onChange={() => setNotifications({...notifications, newGrants: !notifications.newGrants})}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Notification Frequency</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-sm text-white"
                  value={notifications.frequency}
                  onChange={(e) => setNotifications({...notifications, frequency: e.target.value})}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                onClick={() => setShowNotificationModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded text-sm"
                onClick={() => setShowNotificationModal(false)}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grant Details Modal */}
      {showDetailsModal && selectedGrant && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg w-3/4 max-w-2xl max-h-3/4 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-indigo-300 text-xl font-semibold">{selectedGrant.title}</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowDetailsModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-gray-400 text-sm">Category:</span>
                <span className="text-white text-sm ml-2">{selectedGrant.category}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Amount:</span>
                <span className="text-indigo-300 text-sm font-semibold ml-2">{selectedGrant.amount}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Deadline:</span>
                <span className="text-white text-sm ml-2">{selectedGrant.deadline}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Website:</span>
                <a href={selectedGrant.website} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm ml-2">
                  Visit Grant Page
                </a>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-indigo-300 text-md font-semibold mb-2">Description</h4>
              <p className="text-gray-300 text-sm">{selectedGrant.description}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-indigo-300 text-md font-semibold mb-2">Eligibility</h4>
              <p className="text-gray-300 text-sm">{selectedGrant.eligibility}</p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${
                  trackedGrants.some(g => g.id === selectedGrant.id)
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
                onClick={() => {
                  if (!trackedGrants.some(g => g.id === selectedGrant.id)) {
                    handleTrackGrant(selectedGrant);
                  }
                  setShowDetailsModal(false);
                }}
                disabled={trackedGrants.some(g => g.id === selectedGrant.id)}
              >
                {trackedGrants.some(g => g.id === selectedGrant.id) ? "Already Tracked" : "Track This Grant"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
