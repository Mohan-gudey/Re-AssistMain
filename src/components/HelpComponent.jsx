import React from "react";
import { useNavigate } from "react-router-dom";

export default function HelpComponent() {
  const navigate = useNavigate();
  
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
                  tab === "Help"
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
        {/* Left sidebar - simplified for Help */}
        <div className="w-1/4 p-4 border-r border-indigo-900 bg-gray-900">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-indigo-300 mb-3">Help Center</h2>
            <p className="text-sm text-gray-400 mb-4">Get the most out of Re-Assist</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-indigo-300 mb-2">Help Topics</h3>
            <ul className="space-y-1">
              {[
                "Getting Started", 
                "Projects & Papers", 
                "Chat & Citations", 
                "Document Management", 
                "Grants & Conferences",
                "Account Settings",
                "Troubleshooting"
              ].map((topic) => (
                <li 
                  key={topic}
                  className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-800 cursor-pointer"
                >
                  {topic}
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
          <h2 className="text-xl font-semibold mb-4 text-indigo-300">Help Center</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold mb-2 text-indigo-300">Quick Start Guide</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Create a new project using the "+ New Project" button</li>
                <li>Add papers to your project from our database or by URL</li>
                <li>Ask questions about your papers in the chat</li>
                <li>Export citations in your preferred format</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold mb-2 text-indigo-300">Frequently Asked Questions</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <div className="font-medium">How do I add papers to my project?</div>
                  <div className="text-gray-400">Use the drag & drop area or add paper URLs directly.</div>
                </div>
                <div>
                  <div className="font-medium">What citation formats are supported?</div>
                  <div className="text-gray-400">We support IEEE, APA, MLA, and Chicago styles.</div>
                </div>
                <div>
                  <div className="font-medium">Can I collaborate with others on a project?</div>
                  <div className="text-gray-400">Yes, you can invite collaborators from the project settings.</div>
                </div>
                <div>
                  <div className="font-medium">How accurate are the AI-generated responses?</div>
                  <div className="text-gray-400">Our AI provides highly accurate information based on your uploaded papers.</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold mb-2 text-indigo-300">Video Tutorials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Getting Started with Re-Assist", "Advanced Paper Analysis", "Managing Citations"].map((video, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded-md text-center hover:bg-gray-600 cursor-pointer">
                    <div className="text-indigo-300 mb-2">{video}</div>
                    <div className="text-xs text-gray-400">Watch Tutorial</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold mt-4 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}