import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to landing page

export default function ReAssist() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Chats");
  const [showInput, setShowInput] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paperUrl, setPaperUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");

  // Sample data for different tabs
  const allReferencePapers = [
    "Reinforcement Learning for Robotics",
    "AI in Medical Imaging",
    "Large Language Models Explained",
    "Quantum Computing Overview",
    "Secure Federated Learning",
    "Neural Networks in Autonomous Vehicles",
    "Explainable AI Methods",
    "Transfer Learning Approaches",
  ];

  const grants = [
    { title: "NSF AI Research Grant", deadline: "May 15, 2025", amount: "$500,000" },
    { title: "NIH Medical AI Innovation", deadline: "June 30, 2025", amount: "$750,000" },
    { title: "DOE Energy Systems AI", deadline: "July 10, 2025", amount: "$1,200,000" }
  ];

  const conferences = [
    { name: "International Conference on Machine Learning", date: "July 23-29, 2025", location: "Vienna, Austria" },
    { name: "Neural Information Processing Systems", date: "December 5-12, 2025", location: "Montreal, Canada" },
    { name: "ACM Conference on AI Ethics", date: "September 15-18, 2025", location: "San Francisco, USA" }
  ];

  const documents = [
    { name: "Research Proposal Template", type: "Template", lastModified: "April 2, 2025" },
    { name: "Literature Review Guidelines", type: "Guide", lastModified: "March 28, 2025" },
    { name: "AI Ethics Framework", type: "Document", lastModified: "April 8, 2025" }
  ];

  // Project management functions
  const handleNewProjectClick = () => {
    setShowInput(true);
    setProjectName("");
  };

  const handleSaveProject = () => {
    if (projectName.trim()) {
      setProjects([
        ...projects,
        { name: projectName.trim(), papers: [] },
      ]);
      setShowInput(false);
    }
  };

  const handleAddPaperToProject = (paper) => {
    if (selectedProjectIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[selectedProjectIndex].papers.push(paper);
      setProjects(updatedProjects);
      setSearchQuery("");
    } else {
      alert("Please select a project first");
    }
  };

  const handleAddPaperByUrl = () => {
    if (paperUrl.trim() && selectedProjectIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[selectedProjectIndex].papers.push(paperUrl);
      setProjects(updatedProjects);
      setPaperUrl("");
    } else if (!selectedProjectIndex) {
      alert("Please select a project first");
    }
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    if (selectedProjectIndex === index) {
      setSelectedProjectIndex(null);
    }
  };

  const handleEditProjectName = (index, newName) => {
    const updatedProjects = [...projects];
    updatedProjects[index].name = newName;
    setProjects(updatedProjects);
  };

  const filteredPapers = allReferencePapers.filter((paper) =>
    paper.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // File handling functions
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && selectedProjectIndex !== null) {
      const files = Array.from(e.dataTransfer.files);
      
      const updatedProjects = [...projects];
      files.forEach(file => {
        updatedProjects[selectedProjectIndex].papers.push(file.name);
      });
      
      setProjects(updatedProjects);
    } else if (selectedProjectIndex === null) {
      alert("Please select a project first");
    }
  }, [projects, selectedProjectIndex]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0 && selectedProjectIndex !== null) {
      const files = Array.from(e.target.files);
      
      const updatedProjects = [...projects];
      files.forEach(file => {
        updatedProjects[selectedProjectIndex].papers.push(file.name);
      });
      
      setProjects(updatedProjects);
    } else if (selectedProjectIndex === null) {
      alert("Please select a project first");
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Logout function
  const handleLogout = () => {
    // In a real application, you would clear auth tokens here
    navigate("/"); // Navigate to landing page
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real application, this would send the message
      setMessage("");
    }
  };

  const tabs = ["Chats", "Documents", "Grants", "Conferences", "Help"];

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <div className="w-[26%] p-4 flex flex-col gap-4 border-r border-gray-700">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-left px-4 py-2 rounded-md whitespace-nowrap ${
                activeTab === tab
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Chats" && (
          <>
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Re-Assist</div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md font-semibold hover:from-blue-600 hover:to-blue-800 transition-all"
              onClick={handleNewProjectClick}
            >
              + New Project
            </button>

            {showInput && (
              <div className="mt-2">
                <input
                  className="w-full bg-gray-800 text-white rounded-md p-2 mb-2"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <button
                  onClick={handleSaveProject}
                  className="bg-blue-600 hover:bg-blue-700 w-full py-1 rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            )}

            {projects.length > 0 && (
              <div className="mt-4 text-sm text-gray-400">
                <div className="mb-1 font-semibold text-white">
                  Saved Projects
                </div>
                <ul className="space-y-2">
                  {projects.map((project, index) => (
                    <li
                      key={index}
                      className={`bg-gray-800 p-2 rounded-md cursor-pointer ${
                        selectedProjectIndex === index
                          ? "border border-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedProjectIndex(index)}
                    >
                      <div className="flex justify-between items-center">
                        <input
                          value={project.name}
                          onChange={(e) =>
                            handleEditProjectName(index, e.target.value)
                          }
                          className="bg-transparent text-white w-full"
                        />
                        <button
                          className="text-red-500 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(index);
                          }}
                        >
                          ✕
                        </button>
                      </div>

                      {project.papers.length > 0 && (
                        <ul className="mt-1 text-xs text-gray-300 list-disc pl-4">
                          {project.papers.map((paper, idx) => (
                            <li key={idx}>{paper}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add Paper Section */}
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
              onClick={() => setShowSearch((prev) => !prev)}
            >
              + Add Paper
            </button>

            {showSearch && (
              <div className="mt-2">
                <input
                  className="w-full bg-gray-800 text-white p-2 rounded-md mb-2"
                  placeholder="Search paper"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul className="space-y-1 max-h-40 overflow-y-auto text-sm">
                  {filteredPapers.map((paper, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                      onClick={() => handleAddPaperToProject(paper)}
                    >
                      {paper}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm">
                  Add new paper URL
                </label>
                {selectedProjectIndex !== null && (
                  <span className="text-xs text-blue-400">
                    Adding to: {projects[selectedProjectIndex]?.name}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  className="flex-1 bg-gray-800 text-white rounded-md p-2"
                  placeholder="https://arxiv.org/abs/xxx"
                  value={paperUrl}
                  onChange={(e) => setPaperUrl(e.target.value)}
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md"
                  onClick={handleAddPaperByUrl}
                >
                  Add
                </button>
              </div>
              
              <div 
                className={`border-2 border-dashed rounded-md p-4 text-center mt-2 ${
                  isDragging ? "border-blue-500 bg-blue-900/20" : "border-gray-600"
                }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={openFileSelector}
              >
                <p className="text-sm mb-1">
                  {isDragging ? "Drop files here" : "Drag & drop papers or click to upload"}
                </p>
                <p className="text-xs text-gray-400">
                  PDF, DOC, DOCX, TXT files supported
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-left px-4 py-2 rounded-md mt-auto">
              Hint
            </button>
          </>
        )}

        {activeTab === "Documents" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Documents</div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              + New Document
            </button>
            
            <div className="bg-gray-800 rounded-md p-3">
              <div className="flex justify-between text-sm font-semibold border-b border-gray-700 pb-2 mb-2">
                <div className="w-1/2">Name</div>
                <div className="w-1/4">Type</div>
                <div className="w-1/4">Modified</div>
              </div>
              
              {documents.map((doc, index) => (
                <div key={index} className="flex justify-between text-sm py-2 hover:bg-gray-700 rounded px-1">
                  <div className="w-1/2 truncate">{doc.name}</div>
                  <div className="w-1/4 text-gray-400">{doc.type}</div>
                  <div className="w-1/4 text-gray-400">{doc.lastModified}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Grants" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Research Grants</div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            
            <input
              className="w-full bg-gray-800 text-white p-2 rounded-md"
              placeholder="Search grants..."
            />
            
            <div className="space-y-3">
              {grants.map((grant, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-md">
                  <div className="font-semibold">{grant.title}</div>
                  <div className="flex justify-between mt-2 text-sm">
                    <div className="text-gray-400">Deadline: {grant.deadline}</div>
                    <div className="text-blue-400">{grant.amount}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              + Track New Grant
            </button>
          </div>
        )}

        {activeTab === "Conferences" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Conferences</div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            
            <div className="space-y-3">
              {conferences.map((conf, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-md">
                  <div className="font-semibold">{conf.name}</div>
                  <div className="text-sm text-gray-400 mt-1">{conf.date}</div>
                  <div className="text-sm text-blue-400 mt-1">{conf.location}</div>
                </div>
              ))}
            </div>
            
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              + Add Conference
            </button>
          </div>
        )}

        {activeTab === "Help" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Help Center</div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Quick Start Guide</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Create a new project using the "+ New Project" button</li>
                <li>Add papers to your project from our database or by URL</li>
                <li>Ask questions about your papers in the chat</li>
                <li>Export citations in your preferred format</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="font-medium">How do I add papers to my project?</div>
                  <div className="text-gray-400">Use the "+ Add Paper" button, search our database, or drop PDF files directly.</div>
                </div>
                <div>
                  <div className="font-medium">What citation formats are supported?</div>
                  <div className="text-gray-400">We support IEEE, APA, MLA, and Chicago styles.</div>
                </div>
              </div>
            </div>
            
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              Contact Support
            </button>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col px-4 py-2">
        <div className="flex items-center justify-between pb-2">
          <div className="text-center flex-1 relative">
            <div className="text-white border px-4 py-1 rounded-full inline-block border-blue-400">
              {activeTab}
            </div>
          </div>
        </div>

        {activeTab === "Chats" ? (
          <>
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              {selectedProjectIndex !== null ? (
                <div className="text-center">
                  <p className="mb-2">Project: <span className="text-blue-400 font-semibold">{projects[selectedProjectIndex].name}</span></p>
                  <p>{projects[selectedProjectIndex].papers.length} papers added</p>
                  <p className="mt-4">Ask me anything about your papers!</p>
                </div>
              ) : (
                <div className="text-center">
                  <p>Welcome to Re-Assist.</p>
                  <p className="mt-2">Select or create a project to get started.</p>
                </div>
              )}
            </div>

            <div className="mt-2 border-t border-gray-700 pt-2">
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-800 text-white p-2 rounded-md"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md"
                  onClick={handleSendMessage}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-900/50 px-2 py-1 rounded-md text-sm">
                    citation:highlight
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-gray-800 text-white p-1 rounded-md text-sm">
                    <option>simple</option>
                    <option>detailed</option>
                    <option>comprehensive</option>
                  </select>
                  <select className="bg-gray-800 text-white p-1 rounded-md text-sm">
                    <option>IEEE</option>
                    <option>APA</option>
                    <option>MLA</option>
                    <option>Chicago</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === "Documents" ? (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="bg-gray-800 rounded-md p-6 w-4/5 max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Document Management</h2>
              <p className="text-gray-400 mb-4">
                Access and manage your research documents, templates, and guides.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                Open Document Manager
              </button>
            </div>
          </div>
        ) : activeTab === "Grants" ? (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="bg-gray-800 rounded-md p-6 w-4/5 max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Grant Finder</h2>
              <p className="text-gray-400 mb-4">
                Find relevant grants for your research area and get assistance with applications.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                Search Grants
              </button>
            </div>
          </div>
        ) : activeTab === "Conferences" ? (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="bg-gray-800 rounded-md p-6 w-4/5 max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Conference Tracker</h2>
              <p className="text-gray-400 mb-4">
                Stay updated on important academic conferences and submission deadlines.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                View Calendar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="bg-gray-800 rounded-md p-6 w-4/5 max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
              <p className="text-gray-400 mb-4">
                Get assistance with using Re-Assist and maximize your research productivity.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                View Tutorials
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="w-72 border-l border-gray-700 p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold">Information panel</div>
          <button className="text-white text-sm bg-gray-700 p-1 rounded">⛶</button>
        </div>
        
        {selectedProjectIndex !== null && (
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded-md">
              <h3 className="font-semibold text-sm mb-2">Project Summary</h3>
              <p className="text-sm">{projects[selectedProjectIndex].name}</p>
              <p className="text-xs text-gray-400 mt-1">
                {projects[selectedProjectIndex].papers.length} papers
              </p>
            </div>
            
            {projects[selectedProjectIndex].papers.length > 0 && (
              <div className="bg-gray-800 p-3 rounded-md">
                <h3 className="font-semibold text-sm mb-2">Recent Papers</h3>
                <ul className="space-y-1 text-xs">
                  {projects[selectedProjectIndex].papers.slice(0, 3).map((paper, idx) => (
                    <li key={idx} className="truncate text-gray-300">{paper}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 bg-gray-800 p-3 rounded-md">
          <h3 className="font-semibold text-sm mb-2">Quick Tips</h3>
          <ul className="text-xs space-y-2 text-gray-300">
            <li>• Use specific questions to get better answers about your papers</li>
            <li>• Drag and drop multiple files to quickly add them to your project</li>
            <li>• Enable citation highlighting to see sources in responses</li>
          </ul>
        </div>
      </div>
    </div>
  );
}