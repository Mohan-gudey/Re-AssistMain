import React, { useState, useCallback } from "react";

const SectionHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-1">
    <h3 className="font-semibold text-xs text-indigo-700">{title}</h3>
  </div>
);

const Panel = ({ children, className = "" }) => (
  <div className={`bg-white p-2 rounded-md shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

export default function RecommendationsComponent() {
  const [expandedPanels, setExpandedPanels] = useState({
    conferences: true,
    grants: true
  });

  const togglePanel = useCallback((panelName) => {
    setExpandedPanels((prev) => ({
      ...prev,
      [panelName]: !prev[panelName]
    }));
  }, []);

  const conferences = [
    { name: "NeurIPS 2025", date: "Dec 2025", location: "Vancouver, Canada" },
    { name: "ICML 2025", date: "July 2025", location: "Vienna, Austria" },
    { name: "ACL 2025", date: "Aug 2025", location: "Seattle, USA" }
  ];

  const grants = [
    { name: "NSF CAREER Award", agency: "NSF", status: "Submitted" },
    { name: "Google Research Grant", agency: "Google AI", status: "Awarded" },
    { name: "Horizon Europe Grant", agency: "EU Commission", status: "Pending" }
  ];

  return (
    <div className="w-1/5 p-3 border-l border-gray-200 flex flex-col overflow-hidden bg-gray-100">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-indigo-700 text-sm">Recommendations</div>
        <div className="flex gap-1">
          <button
            aria-label="Settings"
            className="text-black text-xs bg-gray-200 hover:bg-gray-300 p-1 rounded"
          >
            ⚙
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-300">
        {/* Conferences Panel */}
        <Panel>
          <div className="flex justify-between items-center mb-1">
            <SectionHeader title="Conferences" />
            <button
              onClick={() => togglePanel("conferences")}
              className="text-gray-600 hover:text-indigo-700"
            >
              {expandedPanels.conferences ? "−" : "+"}
            </button>
          </div>
          {expandedPanels.conferences && (
            <ul className="space-y-1 text-xs text-gray-800">
              {conferences.map((conf, idx) => (
                <li key={idx} className="border-b py-1">
                  <div className="font-medium text-gray-900">{conf.name}</div>
                  <div className="text-gray-600">{conf.date} · {conf.location}</div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* Grants Panel */}
        <Panel>
          <div className="flex justify-between items-center mb-1">
            <SectionHeader title="Grants" />
            <button
              onClick={() => togglePanel("grants")}
              className="text-gray-600 hover:text-indigo-700"
            >
              {expandedPanels.grants ? "−" : "+"}
            </button>
          </div>
          {expandedPanels.grants && (
            <ul className="space-y-1 text-xs text-gray-800">
              {grants.map((grant, idx) => (
                <li key={idx} className="border-b py-1">
                  <div className="font-medium text-gray-900">{grant.name}</div>
                  <div className="text-gray-600">{grant.agency} · Status: {grant.status}</div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}