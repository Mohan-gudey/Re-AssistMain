// import React, { useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ReAssist() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("Chats");
//   const [showInput, setShowInput] = useState(false);
//   const [showPaperOptions, setShowPaperOptions] = useState(false);
//   const [projectName, setProjectName] = useState("");
//   const [projects, setProjects] = useState([]);
//   const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [paperUrl, setPaperUrl] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [activePaper, setActivePaper] = useState(null);
//   const fileInputRef = useRef(null);
//   const [message, setMessage] = useState("");

//   // Sample data for different tabs
//   const allReferencePapers = [
//     "Reinforcement Learning for Robotics",
//     "AI in Medical Imaging",
//     "Large Language Models Explained",
//     "Quantum Computing Overview",
//     "Secure Federated Learning",
//     "Neural Networks in Autonomous Vehicles",
//     "Explainable AI Methods",
//     "Transfer Learning Approaches",
//   ];

//   const grants = [
//     { title: "NSF AI Research Grant", deadline: "May 15, 2025", amount: "$500,000" },
//     { title: "NIH Medical AI Innovation", deadline: "June 30, 2025", amount: "$750,000" },
//     { title: "DOE Energy Systems AI", deadline: "July 10, 2025", amount: "$1,200,000" }
//   ];

//   const conferences = [
//     { name: "International Conference on Machine Learning", date: "July 23-29, 2025", location: "Vienna, Austria" },
//     { name: "Neural Information Processing Systems", date: "December 5-12, 2025", location: "Montreal, Canada" },
//     { name: "ACM Conference on AI Ethics", date: "September 15-18, 2025", location: "San Francisco, USA" }
//   ];

//   const documents = [
//     { name: "Research Proposal Template", type: "Template", lastModified: "April 2, 2025" },
//     { name: "Literature Review Guidelines", type: "Guide", lastModified: "March 28, 2025" },
//     { name: "AI Ethics Framework", type: "Document", lastModified: "April 8, 2025" }
//   ];

//   // Project management functions
//   const handleNewProjectClick = () => {
//     setShowInput(true);
//     setProjectName("");
//     setShowPaperOptions(false);
//   };

//   const handleSaveProject = () => {
//     if (projectName.trim()) {
//       const newProjectIndex = projects.length;
//       setProjects([
//         ...projects,
//         { name: projectName.trim(), papers: [] },
//       ]);
//       setShowInput(false);
//       setSelectedProjectIndex(newProjectIndex);
//       setShowPaperOptions(false); // Don't show paper options yet, show Add Papers button first
//     }
//   };

//   const handleAddPaperToProject = (paper) => {
//     if (selectedProjectIndex !== null) {
//       const updatedProjects = [...projects];
//       updatedProjects[selectedProjectIndex].papers.push(paper);
//       setProjects(updatedProjects);
//       setSearchQuery("");
//     } else {
//       alert("Please select a project first");
//     }
//   };

//   const handleAddPaperByUrl = () => {
//     if (paperUrl.trim() && selectedProjectIndex !== null) {
//       const updatedProjects = [...projects];
//       updatedProjects[selectedProjectIndex].papers.push(paperUrl);
//       setProjects(updatedProjects);
//       setPaperUrl("");
//     } else if (!selectedProjectIndex) {
//       alert("Please select a project first");
//     }
//   };

//   const handleEditProjectName = (index, newName) => {
//     const updatedProjects = [...projects];
//     updatedProjects[index].name = newName;
//     setProjects(updatedProjects);
//   };

//   // Project selection no longer needs to manage showSearch since we show the search by default
//   const handleProjectSelect = (index) => {
//     setSelectedProjectIndex(index);
//     setShowPaperOptions(false); // Reset to show the Add Papers button first
//     setActivePaper(null);
//   };

//   const handlePaperSelect = (paperName, projectIndex, paperIndex) => {
//     setActivePaper({ name: paperName, projectIndex, paperIndex });
//   };

//   const filteredPapers = allReferencePapers.filter((paper) =>
//     paper.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // File handling functions
//   const onDragOver = useCallback((e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   }, []);

//   const onDragLeave = useCallback((e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   }, []);

//   const onDrop = useCallback((e) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && selectedProjectIndex !== null) {
//       const files = Array.from(e.dataTransfer.files);
      
//       const updatedProjects = [...projects];
//       files.forEach(file => {
//         updatedProjects[selectedProjectIndex].papers.push(file.name);
//       });
      
//       setProjects(updatedProjects);
//     } else if (selectedProjectIndex === null) {
//       alert("Please select a project first");
//     }
//   }, [projects, selectedProjectIndex]);

//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files.length > 0 && selectedProjectIndex !== null) {
//       const files = Array.from(e.target.files);
      
//       const updatedProjects = [...projects];
//       files.forEach(file => {
//         updatedProjects[selectedProjectIndex].papers.push(file.name);
//       });
      
//       setProjects(updatedProjects);
//     } else if (selectedProjectIndex === null) {
//       alert("Please select a project first");
//     }
//   };

//   const openFileSelector = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   // Logout function
//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       setMessage("");
//     }
//   };

//   const tabs = ["Chats", "Documents", "Grants", "Conferences", "Help"];

//   return (
//     <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
//       {/* Main Header */}
//       <div className="bg-indigo-950 p-4 border-b border-indigo-800">
//         <div className="flex justify-between items-center">
//           <div className="text-xl font-semibold text-indigo-300">Re-Assist</div>
//           <div className="flex space-x-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === tab
//                     ? "bg-indigo-600 font-semibold"
//                     : "hover:bg-indigo-900 text-indigo-200"
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//           <div className="w-32">
//             {/* Empty div for balance */}
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Panel - Projects */}
//         <div className="w-1/4 p-4 border-r border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
//           <div className="flex-1 overflow-y-auto mb-4">
//             <button
//               className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all mb-4"
//               onClick={handleNewProjectClick}
//             >
//               + New Project
//             </button>

//             {showInput && (
//               <div className="mt-2 mb-4">
//                 <input
//                   className="w-full bg-gray-800 text-white rounded-md p-2 mb-2 border border-indigo-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
//                   placeholder="Enter project name"
//                   value={projectName}
//                   onChange={(e) => setProjectName(e.target.value)}
//                 />
//                 <button
//                   onClick={handleSaveProject}
//                   className="bg-indigo-600 hover:bg-indigo-700 w-full py-1 rounded-md text-sm"
//                 >
//                   Save Project
//                 </button>
//               </div>
//             )}

//             {projects.length > 0 && (
//               <div className="text-sm mb-4">
//                 <div className="mb-1 font-semibold text-indigo-300">
//                   Saved Projects
//                 </div>
//                 <ul className="space-y-2">
//                   {projects.map((project, index) => (
//                     <li
//                       key={index}
//                       className={`bg-gray-800 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition-colors ${
//                         selectedProjectIndex === index
//                           ? "border-l-4 border-indigo-500 pl-1"
//                           : "pl-2"
//                       }`}
//                       onClick={() => handleProjectSelect(index)}
//                     >
//                       <div className="flex justify-between items-center">
//                         <input
//                           value={project.name}
//                           onChange={(e) =>
//                             handleEditProjectName(index, e.target.value)
//                           }
//                           className="bg-transparent text-white w-full focus:outline-none"
//                           onClick={(e) => e.stopPropagation()}
//                         />
//                       </div>

//                       {project.papers.length > 0 && (
//                         <ul className="mt-1 text-xs text-gray-300 list-disc pl-4 max-h-28 overflow-y-auto">
//                           {project.papers.map((paper, idx) => (
//                             <li 
//                               key={idx} 
//                               className={`cursor-pointer hover:text-indigo-300 ${
//                                 activePaper && 
//                                 activePaper.projectIndex === index && 
//                                 activePaper.paperIndex === idx ? 
//                                 "text-indigo-400 font-medium" : ""
//                               }`}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handlePaperSelect(paper, index, idx);
//                               }}
//                             >
//                               {paper}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Add Papers Button */}
//             {selectedProjectIndex !== null && !showPaperOptions && (
//               <div className="mt-4">
//                 <button
//                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition-colors"
//                   onClick={() => setShowPaperOptions(true)}
//                 >
//                   + Add Papers
//                 </button>
//               </div>
//             )}

//             {/* Paper Options - Only show after clicking Add Papers */}
//             {showPaperOptions && selectedProjectIndex !== null && (
//               <div className="space-y-4 mt-4">
//                 {/* Paper Search - Show directly */}
//                 <div>
//                   <div className="flex justify-between items-center mb-1">
//                     <label className="block text-sm text-indigo-300">
//                       Search papers
//                     </label>
//                   </div>
//                   <input
//                     className="w-full bg-gray-800 text-white p-2 rounded-md mb-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Search paper"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <ul className="space-y-1 max-h-40 overflow-y-auto text-sm bg-gray-800 rounded-md p-1">
//                     {filteredPapers.map((paper, idx) => (
//                       <li
//                         key={idx}
//                         className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md cursor-pointer transition-colors"
//                         onClick={() => handleAddPaperToProject(paper)}
//                       >
//                         {paper}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* URL Input */}
//                 <div>
//                   <div className="flex justify-between items-center mb-1">
//                     <label className="block text-sm text-indigo-300">
//                       Add new paper URL
//                     </label>
//                     <span className="text-xs text-indigo-400">
//                       Adding to: {projects[selectedProjectIndex]?.name}
//                     </span>
//                   </div>
//                   <div className="flex gap-2 mb-4">
//                     <input
//                       className="flex-1 bg-gray-800 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                       placeholder="https://arxiv.org/abs/xxx"
//                       value={paperUrl}
//                       onChange={(e) => setPaperUrl(e.target.value)}
//                     />
//                     <button
//                       className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md"
//                       onClick={handleAddPaperByUrl}
//                     >
//                       Add
//                     </button>
//                   </div>
                  
//                   {/* Drag & Drop Upload */}
//                   <div 
//                     className={`border-2 border-dashed rounded-md p-4 text-center mt-2 ${
//                       isDragging ? "border-indigo-500 bg-indigo-900/20" : "border-indigo-800"
//                     }`}
//                     onDragOver={onDragOver}
//                     onDragLeave={onDragLeave}
//                     onDrop={onDrop}
//                     onClick={openFileSelector}
//                   >
//                     <p className="text-sm mb-1 text-indigo-200">
//                       {isDragging ? "Drop files here" : "Drag & drop papers or click to upload"}
//                     </p>
//                     <p className="text-xs text-indigo-400">
//                       PDF, DOC, DOCX, TXT files supported
//                     </p>
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       className="hidden"
//                       multiple
//                       onChange={handleFileSelect}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <button
//             className="bg-indigo-700 hover:bg-indigo-600 text-left px-4 py-2 rounded-md transition-colors"
//           >
//             Hint
//           </button>

//           {/* Logout button at bottom */}
//           <button 
//             className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4 transition-colors"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>

//         {/* Middle Content */}
//         <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
//           {activeTab === "Chats" ? (
//             <div className="flex-1 flex flex-col p-4 overflow-hidden">
//               <div className="flex-1 overflow-y-auto">
//                 {activePaper ? (
//                   <div className="bg-gray-800 rounded-md p-4">
//                     <h2 className="text-xl font-semibold text-indigo-300 mb-3">{activePaper.name}</h2>
//                     <div className="text-sm text-gray-300">
//                       <p>From project: {projects[activePaper.projectIndex].name}</p>
//                       <div className="mt-4 p-3 bg-gray-900 rounded-md">
//                         <p className="text-gray-400 mb-2">Paper content would display here</p>
//                         <p className="text-xs text-gray-500">This is a simulated view of the paper content. 
//                         In a real application, the paper would be rendered here.</p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : selectedProjectIndex !== null ? (
//                   <div className="text-center mt-10">
//                     <p className="mb-2">Project: <span className="text-indigo-400 font-semibold">{projects[selectedProjectIndex].name}</span></p>
//                     <p>{projects[selectedProjectIndex].papers.length} papers added</p>
//                     <p className="mt-4">Ask me anything about your papers!</p>
//                     <p className="text-sm text-indigo-300 mt-2">Click on a paper in the left panel to view its contents</p>
//                   </div>
//                 ) : (
//                   <div className="text-center mt-10">
//                     <p>Welcome to Re-Assist.</p>
//                     <p className="mt-2">Select or create a project to get started.</p>
//                   </div>
//                 )}
//               </div>

//               <div className="border-t border-indigo-900 pt-4">
//                 <div className="flex gap-2">
//                   <input
//                     className="flex-1 bg-gray-800 text-white p-2 rounded-md border border-indigo-800 focus:border-indigo-600 focus:outline-none"
//                     placeholder="Type a message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   />
//                   <button 
//                     className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md transition-colors"
//                     onClick={handleSendMessage}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-between mt-2 gap-2">
//                   <div className="flex items-center gap-2">
//                     <div className="bg-indigo-900/50 px-2 py-1 rounded-md text-sm text-indigo-300">
//                       citation:highlight
//                     </div>
//                     <input type="checkbox" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <select className="bg-gray-800 text-white p-1 rounded-md text-sm border border-indigo-800 focus:border-indigo-500 focus:outline-none">
//                       <option>simple</option>
//                       <option>detailed</option>
//                       <option>comprehensive</option>
//                     </select>
//                     <select className="bg-gray-800 text-white p-1 rounded-md text-sm border border-indigo-800 focus:border-indigo-500 focus:outline-none">
//                       <option>IEEE</option>
//                       <option>APA</option>
//                       <option>MLA</option>
//                       <option>Chicago</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : activeTab === "Documents" ? (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-indigo-300">Document Management</h2>
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors">
//                   + New Document
//                 </button>
//               </div>
              
//               <div className="bg-gray-800 rounded-md p-3">
//                 <div className="flex justify-between text-sm font-semibold border-b border-gray-700 pb-2 mb-2 sticky top-0 bg-gray-800">
//                   <div className="w-1/2">Name</div>
//                   <div className="w-1/4">Type</div>
//                   <div className="w-1/4">Modified</div>
//                 </div>
                
//                 {documents.map((doc, index) => (
//                   <div key={index} className="flex justify-between text-sm py-2 hover:bg-gray-700 rounded px-1 transition-colors">
//                     <div className="w-1/2 truncate">{doc.name}</div>
//                     <div className="w-1/4 text-indigo-300">{doc.type}</div>
//                     <div className="w-1/4 text-gray-400">{doc.lastModified}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : activeTab === "Grants" ? (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-indigo-300">Research Grants</h2>
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors">
//                   + Track New Grant
//                 </button>
//               </div>
              
//               <input
//                 className="w-full bg-gray-800 text-white p-2 rounded-md mb-4 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                 placeholder="Search grants..."
//               />
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {grants.map((grant, index) => (
//                   <div key={index} className="bg-gray-800 p-4 rounded-md">
//                     <div className="font-semibold text-lg text-indigo-300">{grant.title}</div>
//                     <div className="flex justify-between mt-3">
//                       <div className="text-gray-400">Deadline: {grant.deadline}</div>
//                       <div className="text-indigo-400 font-semibold">{grant.amount}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : activeTab === "Conferences" ? (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-indigo-300">Conferences</h2>
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors">
//                   + Add Conference
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {conferences.map((conf, index) => (
//                   <div key={index} className="bg-gray-800 p-4 rounded-md">
//                     <div className="font-semibold text-lg text-indigo-300">{conf.name}</div>
//                     <div className="text-gray-400 mt-2">{conf.date}</div>
//                     <div className="text-indigo-400 mt-1">{conf.location}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h2 className="text-xl font-semibold mb-4 text-indigo-300">Help Center</h2>
              
//               <div className="space-y-4">
//                 <div className="bg-gray-800 p-4 rounded-md">
//                   <h3 className="font-semibold mb-2 text-indigo-300">Quick Start Guide</h3>
//                   <ul className="list-disc pl-5 space-y-1 text-gray-300">
//                     <li>Create a new project using the "+ New Project" button</li>
//                     <li>Add papers to your project from our database or by URL</li>
//                     <li>Ask questions about your papers in the chat</li>
//                     <li>Export citations in your preferred format</li>
//                   </ul>
//                 </div>
                
//                 <div className="bg-gray-800 p-4 rounded-md">
//                   <h3 className="font-semibold mb-2 text-indigo-300">Frequently Asked Questions</h3>
//                   <div className="space-y-3 text-gray-300">
//                     <div>
//                       <div className="font-medium">How do I add papers to my project?</div>
//                       <div className="text-gray-400">Use the drag & drop area or add paper URLs directly.</div>
//                     </div>
//                     <div>
//                       <div className="font-medium">What citation formats are supported?</div>
//                       <div className="text-gray-400">We support IEEE, APA, MLA, and Chicago styles.</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold mt-4 transition-colors">
//                 Contact Support
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Right Panel - Information */}
//         <div className="w-1/4 p-4 border-l border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
//           <div className="flex justify-between items-center mb-3">
//             <div className="font-semibold text-indigo-300">Information panel</div>
//             <button className="text-white text-sm bg-gray-700 p-1 rounded">⛶</button>
//           </div>
          
//           <div className="flex-1 overflow-y-auto space-y-4 pr-1">
//             {selectedProjectIndex !== null && (
//               <>
//                 <div className="bg-gray-800 p-3 rounded-md">
//                   <h3 className="font-semibold text-sm mb-2 text-indigo-300">Project Summary</h3>
//                   <p className="text-sm">{projects[selectedProjectIndex].name}</p>
//                   <p className="text-xs text-indigo-400 mt-1">
//                     {projects[selectedProjectIndex].papers.length} papers
//                   </p>
//                 </div>
                
//                 {projects[selectedProjectIndex].papers.length > 0 && (
//                   <div className="bg-gray-800 p-3 rounded-md">
//                     <h3 className="font-semibold text-sm mb-2 text-indigo-300">Recent Papers</h3>
//                     <ul className="space-y-1 text-xs max-h-32 overflow-y-auto">
//                       {projects[selectedProjectIndex].papers.slice(0, 3).map((paper, idx) => (
//                         <li 
//                           key={idx} 
//                           className="truncate text-gray-300 hover:text-indigo-300 cursor-pointer"
//                           onClick={() => handlePaperSelect(paper, selectedProjectIndex, idx)}
//                         >
//                           {paper}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </>
//             )}
            
//             <div className="bg-gray-800 p-3 rounded-md">
//               <h3 className="font-semibold text-sm mb-2 text-indigo-300">Quick Tips</h3>
//               <ul className="text-xs space-y-2 text-gray-300">
//                 <li>• Use specific questions to get better answers about your papers</li>
//                 <li>• Drag and drop multiple files to quickly add them to your project</li>
//                 <li>• Enable citation highlighting to see sources in responses</li>
//               </ul>
//             </div>

//             {activePaper && (
//               <div className="bg-gray-800 p-3 rounded-md">
//                 <h3 className="font-semibold text-sm mb-2 text-indigo-300">Paper Details</h3>
//                 <div className="text-xs text-gray-300">
//                   <p className="mb-1"><span className="text-indigo-400">Title:</span> {activePaper.name}</p>
//                   <p><span className="text-indigo-400">Added to:</span> {projects[activePaper.projectIndex].name}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { Routes, Route, useLocation } from "react-router-dom";
// import ChatsComponent from "../components/ChatsComponent";
// import DocumentsComponent from "../components/DocumentsComponent";
// import GrantsComponent from "../components/GrantsComponent";
// import ConferencesComponent from "../components/ConferencesComponent";
// import HelpComponent from "../components/HelpComponent";

// function Dashboard() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<ChatsComponent />} />
//         <Route path="/chats" element={<ChatsComponent />} />
//         <Route path="/documents" element={<DocumentsComponent />} />
//         <Route path="/grants" element={<GrantsComponent />} />
//         <Route path="/conferences" element={<ConferencesComponent />} />
//         <Route path="/help" element={<HelpComponent />} />
//       </Routes>
//     </div>
//   );
// }

// export default Dashboard;



import { Routes, Route, useLocation } from "react-router-dom";
import ChatsComponent from "../components/ChatsComponent";
import DocumentsComponent from "../components/DocumentsComponent";
import GrantsComponent from "../components/GrantsComponent";
import ConferencesComponent from "../components/ConferencesComponent";
import HelpComponent from "../components/HelpComponent";
import ResearchProfilePage from "../components/ResearchProfilePage";
import CollaboratorsComponent from "../components/CollaboratorsPage"; // Import the new component

function Dashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatsComponent />} />
        <Route path="/chats" element={<ChatsComponent />} />
        <Route path="/documents" element={<DocumentsComponent />} />
        <Route path="/collaborators" element={<CollaboratorsComponent />} /> {/* Add collaborators route */}
        <Route path="/grants" element={<GrantsComponent />} />
        <Route path="/conferences" element={<ConferencesComponent />} />
        <Route path="/help" element={<HelpComponent />} />
        <Route path="/profile" element={<ResearchProfilePage />} />
      </Routes>
    </div>
  );
}

export default Dashboard;