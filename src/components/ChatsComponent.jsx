// File: src/components/ChatsComponent.js
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ChatsComponent() {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [showPaperOptions, setShowPaperOptions] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [paperUrl, setPaperUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [activePaper, setActivePaper] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");

  // Sample data for papers
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

  // Project management functions
  const handleNewProjectClick = () => {
    setShowInput(true);
    setProjectName("");
    setShowPaperOptions(false);
  };

  const handleSaveProject = () => {
    if (projectName.trim()) {
      const newProjectIndex = projects.length;
      setProjects([
        ...projects,
        { name: projectName.trim(), papers: [] },
      ]);
      setShowInput(false);
      setSelectedProjectIndex(newProjectIndex);
      setShowPaperOptions(false); // Don't show paper options yet, show Add Papers button first
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

  const handleEditProjectName = (index, newName) => {
    const updatedProjects = [...projects];
    updatedProjects[index].name = newName;
    setProjects(updatedProjects);
  };

  const handleProjectSelect = (index) => {
    setSelectedProjectIndex(index);
    setShowPaperOptions(false); // Reset to show the Add Papers button first
    setActivePaper(null);
  };

  const handlePaperSelect = (paperName, projectIndex, paperIndex) => {
    setActivePaper({ name: paperName, projectIndex, paperIndex });
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

  const handleLogout = () => {
    navigate("/");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Projects */}
        <div className="w-1/4 p-4 border-r border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
          <div className="flex-1 overflow-y-auto mb-4">
            <button
              className="w-full bg-gradient-to-r from-indigo-700 to-indigo-700 text-white py-2 rounded-md font-semibold hover:from-indigo-600 hover:to-indigo-600 transition-all mb-4"
              onClick={handleNewProjectClick}
            >
              + New Project
            </button>

            {showInput && (
              <div className="mt-2 mb-4">
                <input
                  className="w-full bg-gray-800 text-white rounded-md p-2 mb-2 border border-indigo-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <button
                  onClick={handleSaveProject}
                  className="bg-indigo-600 hover:bg-indigo-700 w-full py-1 rounded-md text-sm"
                >
                  Save Project
                </button>
              </div>
            )}

            {projects.length > 0 && (
              <div className="text-sm mb-4">
                <div className="mb-1 font-semibold text-indigo-300">
                  Saved Projects
                </div>
                <ul className="space-y-2">
                  {projects.map((project, index) => (
                    <li
                      key={index}
                      className={`bg-gray-800 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition-colors ${
                        selectedProjectIndex === index
                          ? "border-l-4 border-indigo-500 pl-1"
                          : "pl-2"
                      }`}
                      onClick={() => handleProjectSelect(index)}
                    >
                      <div className="flex justify-between items-center">
                        <input
                          value={project.name}
                          onChange={(e) =>
                            handleEditProjectName(index, e.target.value)
                          }
                          className="bg-transparent text-white w-full focus:outline-none"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      {project.papers.length > 0 && (
                        <ul className="mt-1 text-xs text-gray-300 list-disc pl-4 max-h-28 overflow-y-auto">
                          {project.papers.map((paper, idx) => (
                            <li 
                              key={idx} 
                              className={`cursor-pointer hover:text-indigo-300 ${
                                activePaper && 
                                activePaper.projectIndex === index && 
                                activePaper.paperIndex === idx ? 
                                "text-indigo-400 font-medium" : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePaperSelect(paper, index, idx);
                              }}
                            >
                              {paper}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add Papers Button */}
            {selectedProjectIndex !== null && !showPaperOptions && (
              <div className="mt-4">
                <button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition-colors"
                  onClick={() => setShowPaperOptions(true)}
                >
                  + Add Papers
                </button>
              </div>
            )}

            {/* Paper Options - Only show after clicking Add Papers */}
            {showPaperOptions && selectedProjectIndex !== null && (
              <div className="space-y-4 mt-4">
                {/* Paper Search - Show directly */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm text-indigo-300">
                      Search papers
                    </label>
                  </div>
                  <input
                    className="w-full bg-gray-800 text-white p-2 rounded-md mb-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
                    placeholder="Search paper"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <ul className="space-y-1 max-h-40 overflow-y-auto text-sm bg-gray-800 rounded-md p-1">
                    {filteredPapers.map((paper, idx) => (
                      <li
                        key={idx}
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md cursor-pointer transition-colors"
                        onClick={() => handleAddPaperToProject(paper)}
                      >
                        {paper}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* URL Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm text-indigo-300">
                      Add new paper URL
                    </label>
                    <span className="text-xs text-indigo-400">
                      Adding to: {projects[selectedProjectIndex]?.name}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <input
                      className="flex-1 bg-gray-800 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
                      placeholder="https://arxiv.org/abs/xxx"
                      value={paperUrl}
                      onChange={(e) => setPaperUrl(e.target.value)}
                    />
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md"
                      onClick={handleAddPaperByUrl}
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Drag & Drop Upload */}
                  <div 
                    className={`border-2 border-dashed rounded-md p-4 text-center mt-2 ${
                      isDragging ? "border-indigo-500 bg-indigo-900/20" : "border-indigo-800"
                    }`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={openFileSelector}
                  >
                    <p className="text-sm mb-1 text-indigo-200">
                      {isDragging ? "Drop files here" : "Drag & drop papers or click to upload"}
                    </p>
                    <p className="text-xs text-indigo-400">
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
              </div>
            )}
          </div>

          <button
            className="bg-indigo-700 hover:bg-indigo-600 text-left px-4 py-2 rounded-md transition-colors"
          >
            Hint
          </button>

          {/* Logout button at bottom */}
          <button 
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Middle Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {activePaper ? (
                <div className="bg-gray-800 rounded-md p-4">
                  <h2 className="text-xl font-semibold text-indigo-300 mb-3">{activePaper.name}</h2>
                  <div className="text-sm text-gray-300">
                    <p>From project: {projects[activePaper.projectIndex].name}</p>
                    <div className="mt-4 p-3 bg-gray-900 rounded-md">
                      <p className="text-gray-400 mb-2">Paper content would display here</p>
                      <p className="text-xs text-gray-500">This is a simulated view of the paper content. 
                      In a real application, the paper would be rendered here.</p>
                    </div>
                  </div>
                </div>
              ) : selectedProjectIndex !== null ? (
                <div className="text-center mt-10">
                  <p className="mb-2">Project: <span className="text-indigo-400 font-semibold">{projects[selectedProjectIndex].name}</span></p>
                  <p>{projects[selectedProjectIndex].papers.length} papers added</p>
                  <p className="mt-4">Ask me anything about your papers!</p>
                  <p className="text-sm text-indigo-300 mt-2">Click on a paper in the left panel to view its contents</p>
                </div>
              ) : (
                <div className="text-center mt-10">
                  <p>Welcome to Re-Assist.</p>
                  <p className="mt-2">Select or create a project to get started.</p>
                </div>
              )}
            </div>

            <div className="border-t border-indigo-900 pt-4">
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-800 text-white p-2 rounded-md border border-indigo-800 focus:border-indigo-600 focus:outline-none"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md transition-colors"
                  onClick={handleSendMessage}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-900/50 px-2 py-1 rounded-md text-sm text-indigo-300">
                    citation:highlight
                  </div>
                  <input type="checkbox" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-gray-800 text-white p-1 rounded-md text-sm border border-indigo-800 focus:border-indigo-500 focus:outline-none">
                    <option>simple</option>
                    <option>detailed</option>
                    <option>comprehensive</option>
                  </select>
                  <select className="bg-gray-800 text-white p-1 rounded-md text-sm border border-indigo-800 focus:border-indigo-500 focus:outline-none">
                    <option>IEEE</option>
                    <option>APA</option>
                    <option>MLA</option>
                    <option>Chicago</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Information */}
        <div className="w-1/4 p-4 border-l border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
          <div className="flex justify-between items-center mb-3">
            <div className="font-semibold text-indigo-300">Information panel</div>
            <button className="text-white text-sm bg-gray-700 p-1 rounded">⛶</button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {selectedProjectIndex !== null && (
              <>
                <div className="bg-gray-800 p-3 rounded-md">
                  <h3 className="font-semibold text-sm mb-2 text-indigo-300">Project Summary</h3>
                  <p className="text-sm">{projects[selectedProjectIndex].name}</p>
                  <p className="text-xs text-indigo-400 mt-1">
                    {projects[selectedProjectIndex].papers.length} papers
                  </p>
                </div>
                
                {projects[selectedProjectIndex].papers.length > 0 && (
                  <div className="bg-gray-800 p-3 rounded-md">
                    <h3 className="font-semibold text-sm mb-2 text-indigo-300">Recent Papers</h3>
                    <ul className="space-y-1 text-xs max-h-32 overflow-y-auto">
                      {projects[selectedProjectIndex].papers.slice(0, 3).map((paper, idx) => (
                        <li 
                          key={idx} 
                          className="truncate text-gray-300 hover:text-indigo-300 cursor-pointer"
                          onClick={() => handlePaperSelect(paper, selectedProjectIndex, idx)}
                        >
                          {paper}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            
            <div className="bg-gray-800 p-3 rounded-md">
              <h3 className="font-semibold text-sm mb-2 text-indigo-300">Quick Tips</h3>
              <ul className="text-xs space-y-2 text-gray-300">
                <li>• Use specific questions to get better answers about your papers</li>
                <li>• Drag and drop multiple files to quickly add them to your project</li>
                <li>• Enable citation highlighting to see sources in responses</li>
              </ul>
            </div>

            {activePaper && (
              <div className="bg-gray-800 p-3 rounded-md">
                <h3 className="font-semibold text-sm mb-2 text-indigo-300">Paper Details</h3>
                <div className="text-xs text-gray-300">
                  <p className="mb-1"><span className="text-indigo-400">Title:</span> {activePaper.name}</p>
                  <p><span className="text-indigo-400">Added to:</span> {projects[activePaper.projectIndex].name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}