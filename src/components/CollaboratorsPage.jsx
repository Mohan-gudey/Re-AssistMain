// // src/components/CollaboratorsComponent.js
// import React, { useState, useCallback } from "react";

// const CollaboratorCard = ({ collaborator, onRemove }) => (
//   <div className="bg-gray-800 p-4 rounded-lg group hover:bg-gray-700 transition-colors">
//     <div className="flex justify-between items-start">
//       <div>
//         <h3 className="font-medium text-indigo-300">{collaborator.name}</h3>
//         <p className="text-gray-400 mt-1">{collaborator.institution}</p>
//         {collaborator.field && (
//           <p className="mt-1 text-indigo-400 text-sm">Field: {collaborator.field}</p>
//         )}
//       </div>
//       <button 
//         onClick={() => onRemove(collaborator)}
//         className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//     <div className="mt-3 space-x-2">
//       <button className="text-xs bg-indigo-900 hover:bg-indigo-800 text-indigo-300 px-2 py-1 rounded transition-colors">
//         View Profile
//       </button>
//       <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors">
//         Contact
//       </button>
//     </div>
//   </div>
// );

// export default function CollaboratorsComponent() {
//   // Initial collaborators data
//   const [collaborators, setCollaborators] = useState([
//     { name: "Prof. Sarah Johnson", institution: "Stanford University", field: "Natural Language Processing" },
//     { name: "Prof. David Lee", institution: "MIT", field: "Computer Vision" },
//     { name: "Prof. Maria Rodriguez", institution: "UC Berkeley", field: "Reinforcement Learning" },
//     { name: "Dr. James Wilson", institution: "Carnegie Mellon University", field: "Robotics" },
//     { name: "Prof. Emily Chang", institution: "University of Washington", field: "Human-Computer Interaction" },
//     { name: "Dr. Robert Kim", institution: "Oxford University", field: "Computational Neuroscience" }
//   ]);

//   const [newCollaborator, setNewCollaborator] = useState({ name: "", institution: "", field: "" });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [filter, setFilter] = useState("");

//   // Handle adding collaborator
//   const handleAddCollaborator = useCallback(() => {
//     if (newCollaborator.name.trim() && newCollaborator.institution.trim()) {
//       setCollaborators(prev => [...prev, { ...newCollaborator }]);
//       setNewCollaborator({ name: "", institution: "", field: "" });
//       setShowAddForm(false);
//     }
//   }, [newCollaborator]);

//   // Handle removing collaborator
//   const handleRemoveCollaborator = useCallback((collaboratorToRemove) => {
//     setCollaborators(prev => 
//       prev.filter(c => c.name !== collaboratorToRemove.name || c.institution !== collaboratorToRemove.institution)
//     );
//   }, []);

//   // Filter collaborators based on search
//   const filteredCollaborators = collaborators.filter(
//     c => c.name.toLowerCase().includes(filter.toLowerCase()) || 
//          c.institution.toLowerCase().includes(filter.toLowerCase()) ||
//          (c.field && c.field.toLowerCase().includes(filter.toLowerCase()))
//   );

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-indigo-300">Research Collaborators</h1>
//           <button 
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
//           >
//             {showAddForm ? "Cancel" : "+ Add Collaborator"}
//           </button>
//         </div>

//         {/* Add Collaborator Form */}
//         {showAddForm && (
//           <div className="bg-gray-800 p-6 rounded-lg mb-6">
//             <h2 className="text-xl font-semibold text-indigo-300 mb-4">Add New Collaborator</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
//                 <input
//                   className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                   placeholder="Professor name"
//                   value={newCollaborator.name}
//                   onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
//                 <input
//                   className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                   placeholder="Institution"
//                   value={newCollaborator.institution}
//                   onChange={(e) => setNewCollaborator({...newCollaborator, institution: e.target.value})}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-1">Research Field</label>
//                 <input
//                   className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                   placeholder="Research field (optional)"
//                   value={newCollaborator.field}
//                   onChange={(e) => setNewCollaborator({...newCollaborator, field: e.target.value})}
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors"
//                 onClick={handleAddCollaborator}
//               >
//                 Add Collaborator
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Search and Filter */}
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search collaborators..."
//               className="w-full bg-gray-800 text-white p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             />
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Collaborators Grid */}
//         {filteredCollaborators.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCollaborators.map((collaborator, idx) => (
//               <CollaboratorCard 
//                 key={idx} 
//                 collaborator={collaborator} 
//                 onRemove={handleRemoveCollaborator} 
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-lg">No collaborators found matching your search criteria.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/components/CollaboratorsComponent.js
import React, { useState, useCallback } from "react";

const CollaboratorCard = ({ collaborator, onRemove }) => (
  <div className="bg-gray-800 p-4 rounded-lg group hover:bg-gray-700 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-indigo-300">{collaborator.name}</h3>
        <p className="text-gray-400 mt-1">{collaborator.institution}</p>
        {collaborator.field && (
          <p className="mt-1 text-indigo-400 text-sm">Field: {collaborator.field}</p>
        )}
      </div>
      <button 
        onClick={() => onRemove(collaborator)}
        className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    <div className="mt-3 space-x-2">
      <button className="text-xs bg-indigo-900 hover:bg-indigo-800 text-indigo-300 px-2 py-1 rounded transition-colors">
        View Profile
      </button>
      <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors">
        Contact
      </button>
    </div>
  </div>
);

export default function CollaboratorsComponent() {
  const [collaborators, setCollaborators] = useState([
    { name: "Prof. Sarah Johnson", institution: "Stanford University", field: "Natural Language Processing" },
    { name: "Prof. David Lee", institution: "MIT", field: "Computer Vision" },
    { name: "Prof. Maria Rodriguez", institution: "UC Berkeley", field: "Reinforcement Learning" },
    { name: "Dr. James Wilson", institution: "Carnegie Mellon University", field: "Robotics" },
    { name: "Prof. Emily Chang", institution: "University of Washington", field: "Human-Computer Interaction" },
    { name: "Dr. Robert Kim", institution: "Oxford University", field: "Computational Neuroscience" }
  ]);

  const [newCollaborator, setNewCollaborator] = useState({ name: "", institution: "", field: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState("");

  const handleAddCollaborator = useCallback(() => {
    if (newCollaborator.name.trim() && newCollaborator.institution.trim()) {
      setCollaborators(prev => [...prev, { ...newCollaborator }]);
      setNewCollaborator({ name: "", institution: "", field: "" });
      setShowAddForm(false);
    }
  }, [newCollaborator]);

  const handleRemoveCollaborator = useCallback((collaboratorToRemove) => {
    setCollaborators(prev => 
      prev.filter(c => c.name !== collaboratorToRemove.name || c.institution !== collaboratorToRemove.institution)
    );
  }, []);

  const filteredCollaborators = collaborators.filter(
    c => c.name.toLowerCase().includes(filter.toLowerCase()) || 
         c.institution.toLowerCase().includes(filter.toLowerCase()) ||
         (c.field && c.field.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-300">Research Collaborators</h1>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            {showAddForm ? "Cancel" : "+ Add Collaborator"}
          </button>
        </div>

        {/* Add Collaborator Form */}
        {showAddForm && (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">Add New Collaborator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
                  placeholder="Professor name"
                  value={newCollaborator.name}
                  onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
                <input
                  className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
                  placeholder="Institution"
                  value={newCollaborator.institution}
                  onChange={(e) => setNewCollaborator({...newCollaborator, institution: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Research Field</label>
                <input
                  className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
                  placeholder="Research field (optional)"
                  value={newCollaborator.field}
                  onChange={(e) => setNewCollaborator({...newCollaborator, field: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors"
                onClick={handleAddCollaborator}
              >
                Add Collaborator
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search collaborators..."
              className="w-full bg-gray-800 text-white p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Collaborators Grid */}
        {filteredCollaborators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollaborators.map((collaborator, idx) => (
              <CollaboratorCard 
                key={idx} 
                collaborator={collaborator} 
                onRemove={handleRemoveCollaborator} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No collaborators found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
