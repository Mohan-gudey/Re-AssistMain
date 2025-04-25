// // src/components/CollaboratorsComponent.js
// import React, { useState, useCallback } from "react";

// const CollaboratorCard = ({ collaborator, onRemove }) => (
//   <div className=" p-4 rounded-lg group hover:bg-gray-700 transition-colors">
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
//     <div className=" text-white min-h-screen p-6">
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
//           <div className=" p-6 rounded-lg mb-6">
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
//               className="w-full  text-white p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
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


// // src/components/CollaboratorsComponent.js
// import React, { useState, useCallback } from "react";

// const CollaboratorCard = ({ collaborator, onRemove }) => (
//   <div className=" p-4 rounded-lg group hover:bg-gray-700 transition-colors">
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

//   const handleAddCollaborator = useCallback(() => {
//     if (newCollaborator.name.trim() && newCollaborator.institution.trim()) {
//       setCollaborators(prev => [...prev, { ...newCollaborator }]);
//       setNewCollaborator({ name: "", institution: "", field: "" });
//       setShowAddForm(false);
//     }
//   }, [newCollaborator]);

//   const handleRemoveCollaborator = useCallback((collaboratorToRemove) => {
//     setCollaborators(prev => 
//       prev.filter(c => c.name !== collaboratorToRemove.name || c.institution !== collaboratorToRemove.institution)
//     );
//   }, []);

//   const filteredCollaborators = collaborators.filter(
//     c => c.name.toLowerCase().includes(filter.toLowerCase()) || 
//          c.institution.toLowerCase().includes(filter.toLowerCase()) ||
//          (c.field && c.field.toLowerCase().includes(filter.toLowerCase()))
//   );

//   return (
//     <div className=" text-white min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Back Button */}
//         <div className="mb-4">
//           <button
//             onClick={() => window.history.back()}
//             className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back
//           </button>
//         </div>

//         {/* Header */}
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
//           <div className=" p-6 rounded-lg mb-6">
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

//         {/* Search */}
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search collaborators..."
//               className="w-full  text-white p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
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





// // src/components/CollaboratorsComponent.js
// import React, { useState, useCallback } from "react";
// import Sidebar from "./Sidebar"; // Import the Sidebar component

// const CollaboratorCard = ({ collaborator, onRemove }) => (
//   <div className=" p-4 rounded-lg group hover:bg-gray-700 transition-colors">
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

//   const handleAddCollaborator = useCallback(() => {
//     if (newCollaborator.name.trim() && newCollaborator.institution.trim()) {
//       setCollaborators(prev => [...prev, { ...newCollaborator }]);
//       setNewCollaborator({ name: "", institution: "", field: "" });
//       setShowAddForm(false);
//     }
//   }, [newCollaborator]);

//   const handleRemoveCollaborator = useCallback((collaboratorToRemove) => {
//     setCollaborators(prev => 
//       prev.filter(c => c.name !== collaboratorToRemove.name || c.institution !== collaboratorToRemove.institution)
//     );
//   }, []);

//   const filteredCollaborators = collaborators.filter(
//     c => c.name.toLowerCase().includes(filter.toLowerCase()) || 
//          c.institution.toLowerCase().includes(filter.toLowerCase()) ||
//          (c.field && c.field.toLowerCase().includes(filter.toLowerCase()))
//   );

//   return (
//     <div className="flex flex-col  text-white min-h-screen">
//       {/* Include the Sidebar at the top */}
//       <Sidebar />
      
//       <div className="p-6">
//         <div className="max-w-7xl mx-auto">

//           {/* Back Button */}
//           <div className="mb-4">
//             <button
//               onClick={() => window.history.back()}
//               className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back
//             </button>
//           </div>

//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-indigo-300">Research Collaborators</h1>
//             <button 
//               onClick={() => setShowAddForm(!showAddForm)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
//             >
//               {showAddForm ? "Cancel" : "+ Add Collaborator"}
//             </button>
//           </div>

//           {/* Add Collaborator Form */}
//           {showAddForm && (
//             <div className=" p-6 rounded-lg mb-6">
//               <h2 className="text-xl font-semibold text-indigo-300 mb-4">Add New Collaborator</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Professor name"
//                     value={newCollaborator.name}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Institution"
//                     value={newCollaborator.institution}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, institution: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Research Field</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Research field (optional)"
//                     value={newCollaborator.field}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, field: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button
//                   className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors"
//                   onClick={handleAddCollaborator}
//                 >
//                   Add Collaborator
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Search */}
//           <div className="mb-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search collaborators..."
//                 className="w-full  text-white p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Collaborators Grid */}
//           {filteredCollaborators.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredCollaborators.map((collaborator, idx) => (
//                 <CollaboratorCard 
//                   key={idx} 
//                   collaborator={collaborator} 
//                   onRemove={handleRemoveCollaborator} 
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-gray-400 text-lg">No collaborators found matching your search criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/components/CollaboratorsComponent.js
// import React, { useState, useCallback } from "react";
// import Sidebar from "./Sidebar"; // Import the Sidebar component

// const CollaboratorCard = ({ collaborator, onRemove, onViewProfile, onRequestCollab }) => (
//   <div className=" p-4 rounded-lg group hover:bg-gray-700 transition-colors">
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
//         aria-label="Remove collaborator"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//     <div className="mt-3 space-x-2">
//       <button 
//         onClick={() => onViewProfile(collaborator)}
//         className="text-xs bg-indigo-900 hover:bg-indigo-800 text-indigo-300 px-2 py-1 rounded transition-colors"
//       >
//         View Profile
//       </button>
//       <button 
//         onClick={() => onRequestCollab(collaborator)}
//         className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors"
//       >
//         Request Collaboration
//       </button>
//     </div>
//   </div>
// );

// export default function CollaboratorsComponent() {
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
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [selectedCollaborator, setSelectedCollaborator] = useState(null);

//   const handleAddCollaborator = useCallback(() => {
//     if (newCollaborator.name.trim() && newCollaborator.institution.trim()) {
//       setCollaborators(prev => [...prev, { ...newCollaborator }]);
//       setNewCollaborator({ name: "", institution: "", field: "" });
//       setShowAddForm(false);
//     }
//   }, [newCollaborator]);

//   const handleRemoveCollaborator = useCallback((collaboratorToRemove) => {
//     setCollaborators(prev => 
//       prev.filter(c => c.name !== collaboratorToRemove.name || c.institution !== collaboratorToRemove.institution)
//     );
//   }, []);

//   const handleViewProfile = useCallback((collaborator) => {
//     setSelectedCollaborator(collaborator);
//     setShowProfileModal(true);
//   }, []);

//   const handleRequestCollaboration = useCallback((collaborator) => {
//     setSelectedCollaborator(collaborator);
//     setShowRequestModal(true);
//   }, []);

//   const filteredCollaborators = collaborators.filter(
//     c => c.name.toLowerCase().includes(filter.toLowerCase()) || 
//          c.institution.toLowerCase().includes(filter.toLowerCase()) ||
//          (c.field && c.field.toLowerCase().includes(filter.toLowerCase()))
//   );

//   return (
//     <div className="flex flex-col  text-white min-h-screen">
//       {/* Include the Sidebar at the top */}
//       <Sidebar />
      
//       <div className="p-6">
//         <div className="max-w-7xl mx-auto">

//           {/* Back Button */}
//           {/* <div className="mb-4">
//             <button
//               onClick={() => window.history.back()}
//               className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back
//             </button>
//           </div> */}

//           {/* Header */}
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-indigo-300">Research Collaborators</h1>
//           </div>

//           {/* Add Collaborator Form - Hidden by default but kept for functionality */}
//           {showAddForm && (
//             <div className=" p-6 rounded-lg mb-6">
//               <h2 className="text-xl font-semibold text-indigo-300 mb-4">Add New Collaborator</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Professor name"
//                     value={newCollaborator.name}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Institution"
//                     value={newCollaborator.institution}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, institution: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Research Field</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Research field (optional)"
//                     value={newCollaborator.field}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, field: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button
//                   className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors"
//                   onClick={handleAddCollaborator}
//                 >
//                   Add Collaborator
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Search */}
//           <div className="mb-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search collaborators..."
//                 className="w-full  text-white p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Collaborators Grid */}
//           {filteredCollaborators.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredCollaborators.map((collaborator, idx) => (
//                 <CollaboratorCard 
//                   key={idx} 
//                   collaborator={collaborator} 
//                   onRemove={handleRemoveCollaborator}
//                   onViewProfile={handleViewProfile}
//                   onRequestCollab={handleRequestCollaboration}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-gray-400 text-lg">No collaborators found matching your search criteria.</p>
//             </div>
//           )}

//           {/* Profile Modal */}
//           {showProfileModal && selectedCollaborator && (
//             <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//               <div className=" rounded-lg p-6 max-w-md w-full">
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-xl font-bold text-indigo-300">{selectedCollaborator.name}</h2>
//                   <button 
//                     onClick={() => setShowProfileModal(false)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="space-y-3">
//                   <p className="text-indigo-200 font-medium">{selectedCollaborator.institution}</p>
//                   <p className="text-gray-300">Field: {selectedCollaborator.field || "Not specified"}</p>
//                   <div className="pt-3">
//                     <h3 className="text-indigo-400 font-medium mb-2">Research Interests</h3>
//                     <p className="text-gray-300">
//                       Expertise in {selectedCollaborator.field} with focus on advanced research methodologies 
//                       and innovative approaches to problem-solving in the field.
//                     </p>
//                   </div>
//                   <div className="pt-3">
//                     <h3 className="text-indigo-400 font-medium mb-2">Publications</h3>
//                     <ul className="text-gray-300 list-disc pl-4 space-y-1">
//                       <li>Recent advances in {selectedCollaborator.field} (2023)</li>
//                       <li>Computational methods for solving complex problems (2022)</li>
//                       <li>A novel approach to data analysis in research (2021)</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex justify-end">
//                   <button 
//                     onClick={() => {
//                       setShowProfileModal(false);
//                       handleRequestCollaboration(selectedCollaborator);
//                     }}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
//                   >
//                     Request Collaboration
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Request Collaboration Modal */}
//           {showRequestModal && selectedCollaborator && (
//             <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//               <div className=" rounded-lg p-6 max-w-md w-full">
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-xl font-bold text-indigo-300">
//                     Request Collaboration with {selectedCollaborator.name}
//                   </h2>
//                   <button 
//                     onClick={() => setShowRequestModal(false)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
//                     <input
//                       type="text"
//                       placeholder="Research collaboration proposal"
//                       className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
//                     <textarea
//                       placeholder="Describe your collaboration proposal..."
//                       rows="4"
//                       className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     ></textarea>
//                   </div>
//                   <div className="flex items-center">
//                     <input type="checkbox" id="attach-cv" className="mr-2" />
//                     <label htmlFor="attach-cv" className="text-gray-300">Attach CV/Resume</label>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex justify-end space-x-2">
//                   <button 
//                     onClick={() => setShowRequestModal(false)}
//                     className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={() => {
//                       alert(`Collaboration request sent to ${selectedCollaborator.name}!`);
//                       setShowRequestModal(false);
//                     }}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
//                   >
//                     Send Request
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// src/components/CollaboratorsComponent.js
import React, { useState, useCallback } from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { useNavigate } from "react-router-dom";

const CollaboratorCard = ({ collaborator, onRemove, onViewProfile, onRequestCollab }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm group hover:bg-gray-100 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-indigo-700">{collaborator.name}</h3>
        <p className="text-gray-600 mt-1">{collaborator.institution}</p>
        {collaborator.field && (
          <p className="mt-1 text-indigo-600 text-sm">Field: {collaborator.field}</p>
        )}
      </div>
      <button 
        onClick={() => onRemove(collaborator)}
        className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Remove collaborator"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    <div className="mt-3 space-x-2">
      <button 
        onClick={() => onViewProfile(collaborator)}
        className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded transition-colors"
      >
        View Profile
      </button>
      <button 
        onClick={() => onRequestCollab(collaborator)}
        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
      >
        Request Collaboration
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate();
  
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

  const handleViewProfile = useCallback((collaborator) => {
    setSelectedCollaborator(collaborator);
    setShowProfileModal(true);
  }, []);

  const handleRequestCollaboration = useCallback((collaborator) => {
    setSelectedCollaborator(collaborator);
    setShowRequestModal(true);
  }, []);

  const filteredCollaborators = collaborators.filter(
    c => c.name.toLowerCase().includes(filter.toLowerCase()) || 
         c.institution.toLowerCase().includes(filter.toLowerCase()) ||
         (c.field && c.field.toLowerCase().includes(filter.toLowerCase()))
  );
    
  const handleLogout = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowProfileOptions(false);
    navigate("/dashboard/profile"); // Navigate to the profile page within dashboard
  };

  const handleNewCollaborator = () => {
    setShowAddForm(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-1/5 p-3 border-r border-gray-200 flex flex-col">
          <div className="mb-4 flex-1">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">Collaborators</h2>
            <p className="text-sm text-gray-600 mb-3">Find and manage your research collaborators</p>
            
            <div className="space-y-2">
              <button 
                onClick={handleNewCollaborator}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md transition-colors text-sm"
              >
                + New Collaborator
              </button>
            </div>
          </div>
          
          {/* Logout button at bottom with profile symbol */}
          <div className="relative">
            <button 
              className="flex items-center justify-between w-full bg-white hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md transition-colors text-xs border border-gray-300"
              onClick={() => setShowProfileOptions(prev => !prev)}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>User</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {showProfileOptions && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-md shadow-lg border border-blue-200 overflow-hidden z-10">
                <button 
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
                  onClick={handleProfileClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  Profile
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
                  onClick={() => {
                    setShowProfileOptions(false);
                    handleLogout();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-semibold text-indigo-700">Research Collaborators</h1>
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search collaborators..."
                  className="w-full bg-white text-gray-800 py-1 px-3 pl-8 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Collaborators Grid */}
            <div className="bg-white rounded-md shadow-sm p-4">
              {filteredCollaborators.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCollaborators.map((collaborator, idx) => (
                    <CollaboratorCard 
                      key={idx} 
                      collaborator={collaborator} 
                      onRemove={handleRemoveCollaborator}
                      onViewProfile={handleViewProfile}
                      onRequestCollab={handleRequestCollaboration}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No collaborators found matching your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Collaborator Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Add New Collaborator</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                value={newCollaborator.name}
                onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Enter collaborator name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input 
                type="text" 
                value={newCollaborator.institution}
                onChange={(e) => setNewCollaborator({...newCollaborator, institution: e.target.value})}
                className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Enter institution"
              />
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Research Field</label>
              <input 
                type="text"
                value={newCollaborator.field}
                onChange={(e) => setNewCollaborator({...newCollaborator, field: e.target.value})}
                className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Research field (optional)"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCollaborator}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && selectedCollaborator && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">{selectedCollaborator.name}</h3>
                <p className="text-sm text-gray-500">{selectedCollaborator.institution} • Field: {selectedCollaborator.field}</p>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Profile content */}
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-3">
                <div className="pt-2">
                  <h3 className="text-indigo-600 font-medium mb-2">Research Interests</h3>
                  <p className="text-gray-700">
                    Expertise in {selectedCollaborator.field} with focus on advanced research methodologies 
                    and innovative approaches to problem-solving in the field.
                  </p>
                </div>
                <div className="pt-2">
                  <h3 className="text-indigo-600 font-medium mb-2">Publications</h3>
                  <ul className="text-gray-700 list-disc pl-4 space-y-1">
                    <li>Recent advances in {selectedCollaborator.field} (2023)</li>
                    <li>Computational methods for solving complex problems (2022)</li>
                    <li>A novel approach to data analysis in research (2021)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Footer with action buttons */}
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowProfileModal(false);
                  handleRequestCollaboration(selectedCollaborator);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
              >
                Request Collaboration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Collaboration Modal */}
      {showRequestModal && selectedCollaborator && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">Request Collaboration</h3>
                <p className="text-sm text-gray-500">with {selectedCollaborator.name}</p>
              </div>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Request form */}
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Research collaboration proposal"
                    className="w-full bg-white text-gray-800 rounded-md p-2 border border-gray-300 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    placeholder="Describe your collaboration proposal..."
                    rows="4"
                    className="w-full bg-white text-gray-800 rounded-md p-2 border border-gray-300 focus:border-indigo-500 focus:outline-none"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="attach-cv" className="mr-2" />
                  <label htmlFor="attach-cv" className="text-gray-700 text-sm">Attach CV/Resume</label>
                </div>
              </div>
            </div>
            
            {/* Footer with action buttons */}
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
              <button 
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`Collaboration request sent to ${selectedCollaborator.name}!`);
                  setShowRequestModal(false);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



// // src/components/CollaboratorsComponent.js
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Sidebar from "./Sidebar";

// // Improved CollaboratorCard with additional information and better styling
// const CollaboratorCard = ({ collaborator, onRemove, onViewProfile, onRequestCollab }) => (
//   <div className=" p-5 rounded-lg group hover:bg-gray-750 transition-all duration-300 border border-transparent hover:border-indigo-500 shadow-lg">
//     <div className="flex justify-between items-start">
//       <div className="flex items-center">
//         <div className="w-12 h-12 rounded-full bg-indigo-700 flex items-center justify-center text-xl font-bold text-white mr-3">
//           {collaborator.name.split(' ').map(n => n[0]).join('')}
//         </div>
//         <div>
//           <h3 className="font-medium text-indigo-300 text-lg">{collaborator.name}</h3>
//           <p className="text-gray-400">{collaborator.institution}</p>
//           {collaborator.field && (
//             <p className="mt-1 text-indigo-400 text-sm">Field: {collaborator.field}</p>
//           )}
//           {collaborator.projects && (
//             <p className="text-gray-500 text-xs mt-1">
//               {collaborator.projects} project{collaborator.projects !== 1 ? 's' : ''}
//             </p>
//           )}
//         </div>
//       </div>
//       <button 
//         onClick={() => onRemove(collaborator)}
//         className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
//         aria-label="Remove collaborator"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
    
//     {collaborator.status && (
//       <div className={`mt-2 text-xs inline-block px-2 py-1 rounded-full ${
//         collaborator.status === 'Active' ? 'bg-green-900 text-green-300' : 
//         collaborator.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' : 
//         'bg-gray-700 text-gray-300'
//       }`}>
//         {collaborator.status}
//       </div>
//     )}
    
//     <div className="mt-3">
//       {collaborator.expertise && (
//         <div className="flex flex-wrap gap-1 mt-2 mb-3">
//           {collaborator.expertise.map((skill, idx) => (
//             <span key={idx} className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full">
//               {skill}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
    
//     <div className="mt-3 space-x-2 flex">
//       <button 
//         onClick={() => onViewProfile(collaborator)}
//         className="text-xs flex-1 bg-indigo-900 hover:bg-indigo-800 text-indigo-300 px-3 py-2 rounded transition-colors"
//       >
//         View Profile
//       </button>
//       <button 
//         onClick={() => onRequestCollab(collaborator)}
//         className="text-xs flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded transition-colors"
//       >
//         Request Collaboration
//       </button>
//     </div>
//   </div>
// );

// // Enhanced Filter component for better filtering options
// const FilterBar = ({ filter, setFilter, institutionFilter, setInstitutionFilter, fieldFilter, setFieldFilter, statusFilter, setStatusFilter, institutions, fields, statuses }) => (
//   <div className="mb-6 space-y-4">
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Search collaborators..."
//         className="w-full  text-white p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//       />
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//         </svg>
//       </div>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
//         <select
//           className="w-full  text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
//           value={institutionFilter}
//           onChange={(e) => setInstitutionFilter(e.target.value)}
//         >
//           <option value="">All Institutions</option>
//           {institutions.map((inst, idx) => (
//             <option key={idx} value={inst}>{inst}</option>
//           ))}
//         </select>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-400 mb-1">Research Field</label>
//         <select
//           className="w-full  text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
//           value={fieldFilter}
//           onChange={(e) => setFieldFilter(e.target.value)}
//         >
//           <option value="">All Fields</option>
//           {fields.map((field, idx) => (
//             <option key={idx} value={field}>{field}</option>
//           ))}
//         </select>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
//         <select
//           className="w-full  text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="">All Statuses</option>
//           {statuses.map((status, idx) => (
//             <option key={idx} value={status}>{status}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   </div>
// );

// // Improved ProfileModal with more detailed information
// const ProfileModal = ({ collaborator, onClose, onRequestCollaboration }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//     <div className=" rounded-lg p-6 max-w-lg w-full max-h-screen overflow-y-auto">
//       <div className="flex justify-between items-start mb-6">
//         <div className="flex items-center">
//           <div className="w-16 h-16 rounded-full bg-indigo-700 flex items-center justify-center text-2xl font-bold text-white mr-4">
//             {collaborator.name.split(' ').map(n => n[0]).join('')}
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-indigo-300">{collaborator.name}</h2>
//             <p className="text-indigo-200">{collaborator.institution}</p>
//             {collaborator.status && (
//               <span className={`mt-2 text-xs inline-block px-2 py-1 rounded-full ${
//                 collaborator.status === 'Active' ? 'bg-green-900 text-green-300' : 
//                 collaborator.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' : 
//                 'bg-gray-700 text-gray-300'
//               }`}>
//                 {collaborator.status}
//               </span>
//             )}
//           </div>
//         </div>
//         <button 
//           onClick={onClose}
//           className="text-gray-400 hover:text-white transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
      
//       <div className="space-y-6">
//         <div>
//           <h3 className="text-indigo-400 font-medium mb-2 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//             </svg>
//             Research Field
//           </h3>
//           <p className="text-gray-300">{collaborator.field || "Not specified"}</p>
//           {collaborator.expertise && (
//             <div className="flex flex-wrap gap-2 mt-3">
//               {collaborator.expertise.map((skill, idx) => (
//                 <span key={idx} className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
        
//         <div>
//           <h3 className="text-indigo-400 font-medium mb-2 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//             </svg>
//             Research Interests
//           </h3>
//           <p className="text-gray-300">
//             {collaborator.research || `Expertise in ${collaborator.field} with focus on advanced research methodologies 
//             and innovative approaches to problem-solving in the field.`}
//           </p>
//         </div>
        
//         <div>
//           <h3 className="text-indigo-400 font-medium mb-2 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//             Publications
//           </h3>
//           <ul className="text-gray-300 list-disc pl-4 space-y-2">
//             {collaborator.publications ? (
//               collaborator.publications.map((pub, idx) => (
//                 <li key={idx}>{pub.title} ({pub.year})
//                   {pub.journal && <span className="text-gray-400 text-sm block ml-1">{pub.journal}</span>}
//                 </li>
//               ))
//             ) : (
//               <>
//                 <li>Recent advances in {collaborator.field} (2023)</li>
//                 <li>Computational methods for solving complex problems (2022)</li>
//                 <li>A novel approach to data analysis in research (2021)</li>
//               </>
//             )}
//           </ul>
//         </div>
        
//         {collaborator.projects > 0 && (
//           <div>
//             <h3 className="text-indigo-400 font-medium mb-2 flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               Current Projects
//             </h3>
//             <p className="text-gray-300">
//               Currently working on {collaborator.projects} active research project{collaborator.projects !== 1 ? 's' : ''}.
//             </p>
//           </div>
//         )}
        
//         <div>
//           <h3 className="text-indigo-400 font-medium mb-2 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//             Contact Information
//           </h3>
//           <p className="text-gray-300">
//             {collaborator.email || `${collaborator.name.split(' ')[0].toLowerCase()}@${collaborator.institution.toLowerCase().replace(/\s+/g, '')}.edu`}
//           </p>
//         </div>
//       </div>
      
//       <div className="mt-6 flex justify-end">
//         <button 
//           onClick={() => {
//             onClose();
//             onRequestCollaboration(collaborator);
//           }}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors flex items-center"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//           </svg>
//           Request Collaboration
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Improved Collaboration Request Modal
// const RequestCollaborationModal = ({ collaborator, onClose }) => {
//   const [subject, setSubject] = useState(`Research collaboration proposal with ${collaborator.name}`);
//   const [message, setMessage] = useState("");
//   const [attachCV, setAttachCV] = useState(false);
//   const [selectedProject, setSelectedProject] = useState("");
  
//   const projects = [
//     "AI Ethics Research Initiative",
//     "Data Science for Social Good",
//     "Interdisciplinary Climate Change Study",
//     "Robotics and Human Interaction",
//     "New Project..."
//   ];
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className=" rounded-lg p-6 max-w-lg w-full">
//         <div className="flex justify-between items-start mb-6">
//           <h2 className="text-xl font-bold text-indigo-300 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//             </svg>
//             Request Collaboration with {collaborator.name}
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
//             <input
//               type="text"
//               placeholder="Research collaboration proposal"
//               className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-400 mb-1">Project</label>
//             <select
//               className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//               value={selectedProject}
//               onChange={(e) => setSelectedProject(e.target.value)}
//             >
//               <option value="">Select a project or create new</option>
//               {projects.map((project, idx) => (
//                 <option key={idx} value={project}>{project}</option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
//             <textarea
//               placeholder="Describe your collaboration proposal..."
//               rows="6"
//               className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="flex items-center">
//               <input 
//                 type="checkbox" 
//                 id="attach-cv" 
//                 className="mr-2" 
//                 checked={attachCV}
//                 onChange={() => setAttachCV(!attachCV)}
//               />
//               <label htmlFor="attach-cv" className="text-gray-300">Attach CV/Resume</label>
//             </div>
            
//             {attachCV && (
//               <div>
//                 <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Browse Files
//                 </button>
//               </div>
//             )}
//           </div>
          
//           <div className="bg-gray-700/50 p-3 rounded border border-indigo-900/30">
//             <h4 className="text-indigo-300 text-sm font-medium mb-2">Suggested talking points:</h4>
//             <ul className="text-gray-400 text-sm space-y-1 list-disc pl-5">
//               <li>Mention your expertise in {collaborator.field}</li>
//               <li>Reference any shared research interests</li>
//               <li>Discuss potential outcomes of the collaboration</li>
//               <li>Suggest a timeline for the project</li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="mt-6 flex justify-end space-x-2">
//           <button 
//             onClick={onClose}
//             className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded transition-colors"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={() => {
//               alert(`Collaboration request sent to ${collaborator.name}!`);
//               onClose();
//             }}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//             </svg>
//             Send Request
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Stats Component to show collaboration metrics
// const StatsBar = ({ collaborators }) => {
//   const activeCollaborators = collaborators.filter(c => c.status === 'Active').length;
//   const pendingCollaborators = collaborators.filter(c => c.status === 'Pending').length;
//   const totalProjects = collaborators.reduce((sum, c) => sum + (c.projects || 0), 0);
  
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//       <div className=" p-4 rounded-lg border-l-4 border-indigo-500">
//         <div className="text-gray-400 text-sm">Total Collaborators</div>
//         <div className="text-2xl font-bold text-white mt-1">{collaborators.length}</div>
//       </div>
      
//       <div className=" p-4 rounded-lg border-l-4 border-green-500">
//         <div className="text-gray-400 text-sm">Active Collaborations</div>
//         <div className="text-2xl font-bold text-white mt-1">{activeCollaborators}</div>
//       </div>
      
//       <div className=" p-4 rounded-lg border-l-4 border-yellow-500">
//         <div className="text-gray-400 text-sm">Total Research Projects</div>
//         <div className="text-2xl font-bold text-white mt-1">{totalProjects}</div>
//       </div>
//     </div>
//   );
// };

// // Main Component
// export default function CollaboratorsComponent() {
//   // Enhanced dataset with more information
//   const [collaborators, setCollaborators] = useState([
//     { 
//       name: "Prof. Sarah Johnson", 
//       institution: "Stanford University", 
//       field: "Natural Language Processing",
//       expertise: ["Machine Learning", "Transformers", "Semantic Analysis"],
//       status: "Active",
//       projects: 3,
//       publications: [
//         { title: "Advanced NLP Algorithms for Language Understanding", year: 2023, journal: "Journal of AI Research" },
//         { title: "Transformer Models in Language Processing", year: 2022 },
//         { title: "Semantic Analysis Techniques", year: 2021 }
//       ],
//       email: "sjohnson@stanford.edu",
//       research: "Focusing on advanced natural language processing techniques using transformer architectures and deep learning approaches to improve machine understanding of human language."
//     },
//     { 
//       name: "Prof. David Lee", 
//       institution: "MIT", 
//       field: "Computer Vision",
//       expertise: ["Image Recognition", "Neural Networks", "3D Vision"],
//       status: "Active",
//       projects: 2
//     },
//     { 
//       name: "Prof. Maria Rodriguez", 
//       institution: "UC Berkeley", 
//       field: "Reinforcement Learning",
//       expertise: ["Deep Reinforcement Learning", "Multi-agent Systems"],
//       status: "Pending",
//       projects: 1
//     },
//     { 
//       name: "Dr. James Wilson", 
//       institution: "Carnegie Mellon University", 
//       field: "Robotics",
//       expertise: ["Autonomous Systems", "Robot Learning", "Human-Robot Interaction"],
//       status: "Active",
//       projects: 2
//     },
//     { 
//       name: "Prof. Emily Chang", 
//       institution: "University of Washington", 
//       field: "Human-Computer Interaction",
//       expertise: ["User Experience", "Interface Design", "Accessibility"],
//       status: "Inactive",
//       projects: 0
//     },
//     { 
//       name: "Dr. Robert Kim", 
//       institution: "Oxford University", 
//       field: "Computational Neuroscience",
//       expertise: ["Neural Modeling", "Brain-Computer Interfaces"],
//       status: "Active",
//       projects: 1
//     },
//     { 
//       name: "Dr. Lisa Wang", 
//       institution: "ETH Zurich", 
//       field: "Machine Learning",
//       expertise: ["Generative Models", "Federated Learning"],
//       status: "Pending",
//       projects: 1
//     },
//     { 
//       name: "Prof. Michael Brown", 
//       institution: "Cornell University", 
//       field: "Quantum Computing",
//       expertise: ["Quantum Algorithms", "Quantum Information Theory"],
//       status: "Active",
//       projects: 2
//     }
//   ]);

//   const [newCollaborator, setNewCollaborator] = useState({ 
//     name: "", 
//     institution: "", 
//     field: "",
//     expertise: [],
//     status: "Pending",
//     projects: 0
//   });
  
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [institutionFilter, setInstitutionFilter] = useState("");
//   const [fieldFilter, setFieldFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [selectedCollaborator, setSelectedCollaborator] = useState(null);
//   const [viewMode, setViewMode] = useState("grid"); // grid or list
  
//   // Extract unique institutions, fields, and statuses for filters
//   const institutions = [...new Set(collaborators.map(c => c.institution))];
//   const fields = [...new Set(collaborators.map(c => c.field))];
//   const statuses = [...new Set(collaborators.filter(c => c.status).map(c => c.status))];
  
//   // New state for the new expertise input
//   const [newExpertise, setNewExpertise] = useState("");
  
//   // Function to handle adding a new expertise to the new collaborator
//   const handleAddExpertise = useCallback(() => {
//     if (newExpertise.trim()) {
//       setNewCollaborator(prev => ({
//         ...prev,
//         expertise: [...(prev.expertise || []), newExpertise.trim()]
//       }));
//       setNewExpertise("");
//     }
//   }, [newExpertise]);

//   // Function to handle removing an expertise from the new collaborator
//   const handleRemoveExpertise = useCallback((expertiseToRemove) => {
//     setNewCollaborator(prev => ({
//       ...prev,
//       expertise: prev.expertise.filter(e => e !== expertiseToRemove)
//     }));
//   }, []);

//   // Add new collaborator to the list
//   const handleAddCollaborator = useCallback(() => {
//     if (newCollaborator.name.trim() && newCollaborator.institution.trim()) {
//       setCollaborators(prev => [...prev, { 
//         ...newCollaborator,
//         status: newCollaborator.status || "Pending",
//         projects: newCollaborator.projects || 0,
//         expertise: newCollaborator.expertise || []
//       }]);
//       setNewCollaborator({ 
//         name: "", 
//         institution: "", 
//         field: "",
//         expertise: [],
//         status: "Pending",
//         projects: 0
//       });
//       setShowAddForm(false);
//     }
//   }, [newCollaborator]);

//   // Remove collaborator from the list
//   const handleRemoveCollaborator = useCallback((collaboratorToRemove) => {
//     setCollaborators(prev => 
//       prev.filter(c => c.name !== collaboratorToRemove.name || c.institution !== collaboratorToRemove.institution)
//     );
//   }, []);

//   // View collaborator profile
//   const handleViewProfile = useCallback((collaborator) => {
//     setSelectedCollaborator(collaborator);
//     setShowProfileModal(true);
//   }, []);

//   // Request collaboration with a collaborator
//   const handleRequestCollaboration = useCallback((collaborator) => {
//     setSelectedCollaborator(collaborator);
//     setShowRequestModal(true);
//   }, []);

//   // Handle sorting of collaborators
//   const [sortBy, setSortBy] = useState("name");
//   const [sortDirection, setSortDirection] = useState("asc");

//   const handleSort = useCallback((field) => {
//     if (sortBy === field) {
//       setSortDirection(prev => prev === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   }, [sortBy]);

//   // Apply all filters and sort
//   const filteredCollaborators = useMemo(() => {
//     return collaborators
//       .filter(c => 
//         c.name.toLowerCase().includes(filter.toLowerCase()) || 
//         c.institution.toLowerCase().includes(filter.toLowerCase()) ||
//         (c.field && c.field.toLowerCase().includes(filter.toLowerCase())) ||
//         (c.expertise && c.expertise.some(e => e.toLowerCase().includes(filter.toLowerCase())))
//       )
//       .filter(c => !institutionFilter || c.institution === institutionFilter)
//       .filter(c => !fieldFilter || c.field === fieldFilter)
//       .filter(c => !statusFilter || c.status === statusFilter)
//       .sort((a, b) => {
//         if (sortBy === "name") {
//           return sortDirection === "asc" 
//             ? a.name.localeCompare(b.name) 
//             : b.name.localeCompare(a.name);
//         } else if (sortBy === "institution") {
//           return sortDirection === "asc" 
//             ? a.institution.localeCompare(b.institution) 
//             : b.institution.localeCompare(a.institution);
//         } else if (sortBy === "projects") {
//           const projectsA = a.projects || 0;
//           const projectsB = b.projects || 0;
//           return sortDirection === "asc" 
//             ? projectsA - projectsB 
//             : projectsB - projectsA;
//         }
//         return 0;
//       });
//   }, [collaborators, filter, institutionFilter, fieldFilter, statusFilter, sortBy, sortDirection]);

//   // Export collaborators as CSV
//   const exportToCSV = useCallback(() => {
//     const header = "Name,Institution,Field,Status,Projects\n";
//     const csvContent = collaborators.map(c => 
//       `"${c.name}","${c.institution}","${c.field || ''}","${c.status || ''}",${c.projects || 0}`
//     ).join('\n');
    
//     const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'collaborators.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }, [collaborators]);

//   return (
//     <div className="flex flex-col  text-white min-h-screen">
//       {/* Include the Sidebar */}
//       <Sidebar />
      
//       <div className="p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header with Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//             <h1 className="text-2xl font-bold text-indigo-300 flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               Research Collaborators
//             </h1>
//             <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
//               <button
//                 onClick={() => setShowAddForm(true)}
//                 className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-colors flex items-center text-sm"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Add Collaborator
//               </button>
//               <button
//                 onClick={exportToCSV}
//                 className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md font-medium transition-colors flex items-center text-sm"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                 </svg>
//                 Export CSV
//               </button>
//               <div className="flex border border-gray-700 rounded-md overflow-hidden">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`px-3 py-2 flex items-center ${viewMode === "grid" ? "bg-indigo-700" : " hover:bg-gray-700"}`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`px-3 py-2 flex items-center ${viewMode === "list" ? "bg-indigo-700" : " hover:bg-gray-700"}`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Bar */}
//           <StatsBar collaborators={collaborators} />
          
//           {/* Filters */}
//           <FilterBar 
//             filter={filter}
//             setFilter={setFilter}
//             institutionFilter={institutionFilter}
//             setInstitutionFilter={setInstitutionFilter}
//             fieldFilter={fieldFilter}
//             setFieldFilter={setFieldFilter}
//             statusFilter={statusFilter}
//             setStatusFilter={setStatusFilter}
//             institutions={institutions}
//             fields={fields}
//             statuses={statuses}
//           />

//           {/* Add Collaborator Form - Hidden by default */}
//           {showAddForm && (
//             <div className=" p-6 rounded-lg mb-6 border border-indigo-900/30 shadow-lg">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-xl font-semibold text-indigo-300 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Add New Collaborator
//                 </h2>
//                 <button 
//                   onClick={() => setShowAddForm(false)}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Professor name"
//                     value={newCollaborator.name}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Institution"
//                     value={newCollaborator.institution}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, institution: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Research Field</label>
//                   <input
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Research field"
//                     value={newCollaborator.field}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, field: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
//                   <select
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     value={newCollaborator.status}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, status: e.target.value})}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Projects</label>
//                   <input
//                     type="number"
//                     min="0"
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Number of active projects"
//                     value={newCollaborator.projects}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, projects: parseInt(e.target.value) || 0})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
//                   <input
//                     type="email"
//                     className="w-full bg-gray-700 text-white rounded-md p-2 border border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Email address"
//                     value={newCollaborator.email || ""}
//                     onChange={(e) => setNewCollaborator({...newCollaborator, email: e.target.value})}
//                   />
//                 </div>
//               </div>
              
//               {/* Expertise Section */}
//               <div className="mt-4">
//                 <label className="block text-sm font-medium text-gray-400 mb-1">Expertise / Skills</label>
//                 <div className="flex">
//                   <input
//                     className="flex-1 bg-gray-700 text-white rounded-l-md p-2 border border-r-0 border-indigo-800 focus:border-indigo-500 focus:outline-none"
//                     placeholder="Add skill or expertise"
//                     value={newExpertise}
//                     onChange={(e) => setNewExpertise(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleAddExpertise()}
//                   />
//                   <button
//                     onClick={handleAddExpertise}
//                     className="bg-indigo-700 hover:bg-indigo-600 px-3 rounded-r-md"
//                   >
//                     Add
//                   </button>
//                 </div>
                
//                 {newCollaborator.expertise && newCollaborator.expertise.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {newCollaborator.expertise.map((skill, idx) => (
//                       <span key={idx} className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full flex items-center">
//                         {skill}
//                         <button 
//                           onClick={() => handleRemoveExpertise(skill)}
//                           className="ml-1 text-indigo-400 hover:text-white"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                           </svg>
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               <div className="flex justify-end mt-6">
//                 <button
//                   className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md font-medium transition-colors mr-2"
//                   onClick={() => setShowAddForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors"
//                   onClick={handleAddCollaborator}
//                 >
//                   Add Collaborator
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Sort Controls for List View */}
//           {viewMode === "list" && (
//             <div className=" rounded-t-lg p-3 grid grid-cols-12 gap-2 font-medium text-gray-400 text-sm border-b border-gray-700">
//               <div 
//                 className="col-span-3 md:col-span-4 flex items-center cursor-pointer hover:text-white transition-colors"
//                 onClick={() => handleSort("name")}
//               >
//                 Name
//                 {sortBy === "name" && (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     {sortDirection === "asc" ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     )}
//                   </svg>
//                 )}
//               </div>
//               <div 
//                 className="col-span-3 flex items-center cursor-pointer hover:text-white transition-colors"
//                 onClick={() => handleSort("institution")}
//               >
//                 Institution
//                 {sortBy === "institution" && (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     {sortDirection === "asc" ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     )}
//                   </svg>
//                 )}
//               </div>
//               <div className="col-span-2 hidden md:block">Field</div>
//               <div className="col-span-2 hidden md:block">Status</div>
//               <div 
//                 className="col-span-2 md:col-span-1 flex items-center cursor-pointer hover:text-white transition-colors"
//                 onClick={() => handleSort("projects")}
//               >
//                 Projects
//                 {sortBy === "projects" && (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     {sortDirection === "asc" ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     )}
//                   </svg>
//                 )}
//               </div>
//               <div className="col-span-4 md:col-span-1 text-right">Actions</div>
//             </div>
//           )}

//           {/* Collaborators Display */}
//           {filteredCollaborators.length > 0 ? (
//             viewMode === "grid" ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCollaborators.map((collaborator, idx) => (
//                   <CollaboratorCard 
//                     key={idx} 
//                     collaborator={collaborator} 
//                     onRemove={handleRemoveCollaborator}
//                     onViewProfile={handleViewProfile}
//                     onRequestCollab={handleRequestCollaboration}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className=" rounded-b-lg mb-4">
//                 {filteredCollaborators.map((collaborator, idx) => (
//                   <div 
//                     key={idx} 
//                     className={`grid grid-cols-12 gap-2 p-3 items-center hover:bg-gray-750 transition-colors ${
//                       idx !== filteredCollaborators.length - 1 ? 'border-b border-gray-700' : ''
//                     }`}
//                   >
//                     <div className="col-span-3 md:col-span-4 flex items-center">
//                       <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-sm font-bold text-white mr-2">
//                         {collaborator.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <div>
//                         <p className="text-indigo-300 font-medium">{collaborator.name}</p>
//                         <p className="text-gray-500 text-xs md:hidden">{collaborator.institution}</p>
//                       </div>
//                     </div>
//                     <div className="col-span-3 hidden md:block text-gray-300">{collaborator.institution}</div>
//                     <div className="col-span-2 hidden md:block text-indigo-400 text-sm">{collaborator.field}</div>
//                     <div className="col-span-2 hidden md:block">
//                       {collaborator.status && (
//                         <span className={`text-xs inline-block px-2 py-1 rounded-full ${
//                           collaborator.status === 'Active' ? 'bg-green-900 text-green-300' : 
//                           collaborator.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' : 
//                           'bg-gray-700 text-gray-300'
//                         }`}>
//                           {collaborator.status}
//                         </span>
//                       )}
//                     </div>
//                     <div className="col-span-2 md:col-span-1 text-gray-300">{collaborator.projects || 0}</div>
//                     <div className="col-span-4 md:col-span-1 flex justify-end space-x-1">
//                       <button 
//                         onClick={() => handleViewProfile(collaborator)}
//                         className="text-gray-400 hover:text-indigo-300 transition-colors p-1"
//                         aria-label="View profile"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </button>
//                       <button 
//                         onClick={() => handleRequestCollaboration(collaborator)}
//                         className="text-gray-400 hover:text-indigo-300 transition-colors p-1"
//                         aria-label="Request collaboration"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                         </svg>
//                       </button>
//                       <button 
//                         onClick={() => handleRemoveCollaborator(collaborator)}
//                         className="text-gray-400 hover:text-red-500 transition-colors p-1"
//                         aria-label="Remove collaborator"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           ) : (
//             <div className="text-center py-12  rounded-lg">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-gray-400 text-lg">No collaborators found matching your search criteria.</p>
//               <button
//                 onClick={() => {
//                   setFilter("");
//                   setInstitutionFilter("");
//                   setFieldFilter("");
//                   setStatusFilter("");
//                 }}
//                 className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors"
//               >
//                 Clear all filters
//               </button>
//             </div>
//           )}

//           {/* Pagination - Could be expanded in a real implementation */}
//           {filteredCollaborators.length > 0 && (
//             <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
//               <div>
//                 Showing {filteredCollaborators.length} of {collaborators.length} collaborators
//               </div>
//               <div className="flex items-center space-x-1">
//                 <button className="px-2 py-1 rounded  hover:bg-gray-700 transition-colors">
//                   1
//                 </button>
//                 <span>of 1</span>
//               </div>
//             </div>
//           )}

//           {/* Profile Modal */}
//           {showProfileModal && selectedCollaborator && (
//             <ProfileModal 
//               collaborator={selectedCollaborator}
//               onClose={() => setShowProfileModal(false)}
//               onRequestCollaboration={handleRequestCollaboration}
//             />
//           )}

//           {/* Request Collaboration Modal */}
//           {showRequestModal && selectedCollaborator && (
//             <RequestCollaborationModal 
//               collaborator={selectedCollaborator}
//               onClose={() => setShowRequestModal(false)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }