// File: src/components/ResearchProfileComponent.js
import React, { useState, useCallback } from "react";

// Reusable components for better organization and reusability
const SectionHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-1">
    <h3 className="font-semibold text-xs text-indigo-300">{title}</h3>
  </div>
);

const Panel = ({ children, className = "" }) => (
  <div className={`bg-gray-800 p-2 rounded-md ${className}`}>
    {children}
  </div>
);

export default function ResearchProfileComponent({ selectedProjectIndex, projects }) {
  // Research Interests state
  const [researchInterests, setResearchInterests] = useState([
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Reinforcement Learning"
  ]);
  const [newInterest, setNewInterest] = useState("");
  const [showAddInterest, setShowAddInterest] = useState(false);

  // Collaborators state
  const [collaborators, setCollaborators] = useState([
    { name: "Prof. Sarah Johnson", institution: "Stanford University", field: "Natural Language Processing" },
    { name: "Prof. David Lee", institution: "MIT", field: "Computer Vision" },
    { name: "Prof. Maria Rodriguez", institution: "UC Berkeley", field: "Reinforcement Learning" }
  ]);
  const [newCollaborator, setNewCollaborator] = useState({ name: "", institution: "", field: "" });
  const [showAddCollaborator, setShowAddCollaborator] = useState(false);
  
  // Panel expansion state
  const [expandedPanels, setExpandedPanels] = useState({
    interests: true,
    collaborators: true,
    projectSummary: true,
    recentPapers: true,
    quickTips: true
  });

  // Interest handlers
  const handleAddInterest = useCallback(() => {
    if (newInterest.trim()) {
      setResearchInterests(prev => [...prev, newInterest.trim()]);
      setNewInterest("");
      setShowAddInterest(false);
    }
  }, [newInterest]);

  const handleRemoveInterest = useCallback((index) => {
    setResearchInterests(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  // Collaborator handlers
  const handleAddCollaborator = useCallback(() => {
    if (newCollaborator.name.trim() && newCollaborator.institution.trim()) {
      setCollaborators(prev => [...prev, { ...newCollaborator }]);
      setNewCollaborator({ name: "", institution: "", field: "" });
      setShowAddCollaborator(false);
    }
  }, [newCollaborator]);

  const handleRemoveCollaborator = useCallback((index) => {
    setCollaborators(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  // Handle panel toggle
  const togglePanel = useCallback((panelName) => {
    setExpandedPanels(prev => ({
      ...prev,
      [panelName]: !prev[panelName]
    }));
  }, []);

  // Handle keydown for inputs
  const handleKeyDown = useCallback((e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  }, []);

  // Check if we have project data
  const hasProjectData = selectedProjectIndex !== null && projects && projects[selectedProjectIndex];
  const selectedProject = hasProjectData ? projects[selectedProjectIndex] : null;

  return (
    <div className="w-1/5 p-3 border-l border-indigo-900 flex flex-col overflow-hidden bg-gray-900">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-indigo-300 text-sm">Research Profile</div>
        <div className="flex gap-1">
          <button className="text-white text-xs bg-gray-700 hover:bg-gray-600 p-1 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="text-white text-xs bg-gray-700 hover:bg-gray-600 p-1 rounded transition-colors">⛶</button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-700">
        {/* Research Interests Section */}
        <Panel>
          <div className="flex justify-between items-center mb-1">
            <SectionHeader title="Research Interests" />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAddInterest(!showAddInterest)}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-0.5 rounded transition-colors"
              >
                {showAddInterest ? "Cancel" : "+ Add"}
              </button>
              <button 
                onClick={() => togglePanel('interests')}
                className="text-gray-400 hover:text-white"
              >
                {expandedPanels.interests ? '−' : '+'}
              </button>
            </div>
          </div>

                      {expandedPanels.interests && (
            <>
              {showAddInterest && (
                <div className="my-2 mb-3">
                  <input
                    className="w-full bg-gray-700 text-white rounded-md p-1 border border-indigo-800 focus:border-indigo-500 focus:outline-none text-xs mb-1"
                    placeholder="Add new interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, handleAddInterest)}
                    autoFocus
                  />
                  <div className="flex justify-end">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      onClick={handleAddInterest}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <ul className="text-xs space-y-1 text-gray-300 max-h-32 overflow-y-auto mt-1">
                {researchInterests.map((interest, idx) => (
                  <li key={idx} className="flex justify-between items-center group">
                    <span className="hover:text-indigo-300 cursor-pointer">• {interest}</span>
                    <button 
                      onClick={() => handleRemoveInterest(idx)}
                      className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Panel>
        
        {/* Collaborators Section */}
        <Panel>
          <div className="flex justify-between items-center mb-1">
            <SectionHeader title="Collaborators" />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAddCollaborator(!showAddCollaborator)}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-0.5 rounded transition-colors"
              >
                {showAddCollaborator ? "Cancel" : "+ Add"}
              </button>
              <button 
                onClick={() => togglePanel('collaborators')}
                className="text-gray-400 hover:text-white"
              >
                {expandedPanels.collaborators ? '−' : '+'}
              </button>
            </div>
          </div>

          {expandedPanels.collaborators && (
            <>
              {showAddCollaborator && (
                <div className="my-2 space-y-1 mb-3">
                  <input
                    className="w-full bg-gray-700 text-white rounded-md p-1 border border-indigo-800 focus:border-indigo-500 focus:outline-none text-xs"
                    placeholder="Professor name"
                    value={newCollaborator.name}
                    onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
                    autoFocus
                  />
                  <input
                    className="w-full bg-gray-700 text-white rounded-md p-1 border border-indigo-800 focus:border-indigo-500 focus:outline-none text-xs"
                    placeholder="Institution"
                    value={newCollaborator.institution}
                    onChange={(e) => setNewCollaborator({...newCollaborator, institution: e.target.value})}
                  />
                  <input
                    className="w-full bg-gray-700 text-white rounded-md p-1 border border-indigo-800 focus:border-indigo-500 focus:outline-none text-xs"
                    placeholder="Research field (optional)"
                    value={newCollaborator.field}
                    onChange={(e) => setNewCollaborator({...newCollaborator, field: e.target.value})}
                    onKeyDown={(e) => handleKeyDown(e, handleAddCollaborator)}
                  />
                  <div className="flex justify-end mt-1">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      onClick={handleAddCollaborator}
                    >
                      Add Collaborator
                    </button>
                  </div>
                </div>
              )}

              <ul className="text-xs space-y-2 text-gray-300 max-h-48 overflow-y-auto mt-1">
                {collaborators.map((collaborator, idx) => (
                  <li key={idx} className="bg-gray-700 p-1.5 rounded group hover:bg-gray-600 transition-colors">
                    <div className="flex justify-between">
                      <span className="font-medium text-indigo-300">{collaborator.name}</span>
                      <button 
                        onClick={() => handleRemoveCollaborator(idx)}
                        className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-gray-400 mt-0.5">{collaborator.institution}</div>
                    {collaborator.field && (
                      <div className="mt-0.5 text-indigo-400 text-xs">Field: {collaborator.field}</div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Panel>

        {/* Project Summary */}
        {hasProjectData && (
          <Panel>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-xs text-indigo-300">Project Summary</h3>
              <button 
                onClick={() => togglePanel('projectSummary')}
                className="text-gray-400 hover:text-white"
              >
                {expandedPanels.projectSummary ? '−' : '+'}
              </button>
            </div>
            
            {expandedPanels.projectSummary && (
              <>
                <p className="text-xs text-white">{selectedProject.name}</p>
                <div className="flex gap-2 mt-1">
                  <div className="text-xs px-2 py-0.5 bg-indigo-900 rounded-full text-indigo-300">
                    {selectedProject.papers.length} papers
                  </div>
                  {selectedProject.status && (
                    <div className="text-xs px-2 py-0.5 bg-green-900 rounded-full text-green-300">
                      {selectedProject.status}
                    </div>
                  )}
                </div>
              </>
            )}
          </Panel>
        )}
        
        {/* Recent Papers Section */}
        {hasProjectData && selectedProject.papers.length > 0 && (
          <Panel>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-xs text-indigo-300">Recent Papers</h3>
              <button 
                onClick={() => togglePanel('recentPapers')}
                className="text-gray-400 hover:text-white"
              >
                {expandedPanels.recentPapers ? '−' : '+'}
              </button>
            </div>
            
            {expandedPanels.recentPapers && (
              <ul className="space-y-1 text-xs max-h-32 overflow-y-auto">
                {selectedProject.papers.slice(0, 3).map((paper, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-1 group py-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-0.5 flex-shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 hover:text-indigo-300 cursor-pointer">
                      {paper}
                    </span>
                  </li>
                ))}
                {selectedProject.papers.length > 3 && (
                  <li className="text-indigo-400 hover:text-indigo-300 cursor-pointer text-center pt-1">
                    View all {selectedProject.papers.length} papers
                  </li>
                )}
              </ul>
            )}
          </Panel>
        )}
        
        {/* Quick Tips Section */}
        <Panel>
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-xs text-indigo-300">Quick Tips</h3>
            <button 
              onClick={() => togglePanel('quickTips')}
              className="text-gray-400 hover:text-white"
            >
              {expandedPanels.quickTips ? '−' : '+'}
            </button>
          </div>
          
          {expandedPanels.quickTips && (
            <ul className="text-xs space-y-1 text-gray-300">
              <li className="flex items-start gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-0.5 flex-shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Use specific questions for better answers</span>
              </li>
              <li className="flex items-start gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-0.5 flex-shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Drag and drop files to add them quickly</span>
              </li>
              <li className="flex items-start gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-0.5 flex-shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>Enable citation highlighting for sources</span>
              </li>
              <li className="flex items-start gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-0.5 flex-shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Customize your research profile settings</span>
              </li>
            </ul>
          )}
        </Panel>
      </div>

      {/* Footer with export option */}
      <div className="mt-3 pt-2 border-t border-gray-700 flex justify-between items-center text-xs">
        <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export Data
        </button>
        <span className="text-gray-500">Updated: Today</span>
      </div>
    </div>
  );
}