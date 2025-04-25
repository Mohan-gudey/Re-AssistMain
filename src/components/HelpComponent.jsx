// // File: src/components/HelpComponent.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function HelpComponent() {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("Getting Started");
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Help topics organized by section
//   const helpContent = {
//     "Getting Started": [
//       {
//         title: "Welcome to Re-Assist",
//         content: "Re-Assist is an AI-powered research assistant that helps you organize papers, extract insights, and accelerate your research workflow. This guide will help you get the most out of the platform."
//       },
//       {
//         title: "Creating Your First Project",
//         content: "To get started, navigate to the Chats tab and click the '+ New Project' button. Give your project a name related to your research topic. Once created, you can add papers to your project."
//       },
//       {
//         title: "Adding Papers",
//         content: "There are multiple ways to add papers to your project: search our database, provide URLs to papers (e.g., from arXiv), or upload PDF files directly by dragging and dropping them."
//       },
//       {
//         title: "Asking Questions",
//         content: "Once you've added papers to your project, you can ask questions about them in the chat interface. Re-Assist will analyze your papers and provide insights, summaries, and answers based on the content."
//       }
//     ],
//     "Projects & Papers": [
//       {
//         title: "Managing Multiple Projects",
//         content: "You can create and manage multiple research projects. Each project can contain a different set of papers, allowing you to organize your research by topic, publication, or any other criteria."
//       },
//       {
//         title: "Supported Paper Formats",
//         content: "Re-Assist supports PDF, DOC, DOCX, and TXT file formats. For best results with PDFs, ensure they are text-searchable and not scanned images."
//       },
//       {
//         title: "Organizing Papers",
//         content: "Within each project, you can categorize papers, add notes, and highlight important sections. This helps you keep track of key information and quickly locate relevant content."
//       },
//       {
//         title: "Paper Analysis",
//         content: "Re-Assist automatically analyzes your papers to extract key information such as authors, publication date, abstract, methodology, results, and references. This makes it easier to find specific information."
//       }
//     ],
//     "Chat & Citations": [
//       {
//         title: "Conversational Interface",
//         content: "The chat interface allows you to have a natural conversation with Re-Assist about your papers. You can ask questions, request summaries, or explore specific topics mentioned in your papers."
//       },
//       {
//         title: "Citation Highlighting",
//         content: "When Re-Assist provides information from your papers, it includes citations to the source. Enable 'citation:highlight' to see exactly where the information comes from."
//       },
//       {
//         title: "Citation Formats",
//         content: "Re-Assist supports multiple citation formats including IEEE, APA, MLA, and Chicago. You can select your preferred format using the dropdown menu in the chat interface."
//       },
//       {
//         title: "Complex Queries",
//         content: "You can ask complex questions that span multiple papers. For example, 'What are the common findings across all these papers regarding neural network architectures?'"
//       }
//     ],
//     "Document Management": [
//       {
//         title: "Creating Documents",
//         content: "In the Documents tab, you can create new documents based on your research. These can be notes, literature reviews, research proposals, or any other type of document."
//       },
//       {
//         title: "Templates",
//         content: "Re-Assist provides various templates to help you get started with common document types like research proposals, literature reviews, and methodology sections."
//       },
//       {
//         title: "Collaborative Editing",
//         content: "You can share documents with collaborators, allowing for real-time editing and commenting. This makes it easy to work on research papers or proposals with colleagues."
//       },
//       {
//         title: "Export Options",
//         content: "Documents can be exported in multiple formats including PDF, DOCX, and LaTeX. This makes it easy to use your content in other applications or for submission to journals."
//       }
//     ],
//     "Grants & Conferences": [
//       {
//         title: "Finding Funding Opportunities",
//         content: "The Grants tab helps you discover relevant funding opportunities based on your research interests. You can filter by funding agency, deadline, and research area."
//       },
//       {
//         title: "Conference Tracking",
//         content: "In the Conferences tab, you can keep track of important academic conferences in your field. Set reminders for submission deadlines and receive notifications."
//       },
//       {
//         title: "Grant Writing Assistance",
//         content: "Re-Assist can help you draft sections of grant proposals based on your research papers. It can generate summaries, literature reviews, and methodology descriptions."
//       },
//       {
//         title: "Conference Paper Preparation",
//         content: "Prepare conference submissions with Re-Assist's help. Generate abstracts, outlines, and first drafts based on your existing research to speed up the submission process."
//       }
//     ],
//     "Account Settings": [
//       {
//         title: "Profile Management",
//         content: "Manage your profile information including name, email, and password. You can also update your research interests and preferences."
//       },
//       {
//         title: "Subscription Plans",
//         content: "View and manage your subscription plan. Re-Assist offers various tiers designed for individual researchers, teams, and institutions."
//       },
//       {
//         title: "Security Settings",
//         content: "Set up two-factor authentication, manage API keys, and review your account activity to keep your research data secure."
//       },
//       {
//         title: "Notification Preferences",
//         content: "Control which notifications you receive and how they're delivered. Get alerts for important deadlines, new grant opportunities, or when collaborators make changes."
//       }
//     ],
//     "Troubleshooting": [
//       {
//         title: "Common Issues",
//         content: "Solutions to common problems such as file upload errors, search issues, or performance concerns."
//       },
//       {
//         title: "Contact Support",
//         content: "Can't find what you're looking for? Contact our support team at support@reassist.ai or use the built-in chat support feature."
//       },
//       {
//         title: "System Requirements",
//         content: "Re-Assist works best on modern browsers including Chrome, Firefox, Safari, and Edge. For optimal performance, we recommend at least 8GB of RAM and a high-speed internet connection."
//       },
//       {
//         title: "Known Limitations",
//         content: "Current limitations include a maximum of 50 papers per project, file size limits of 50MB per upload, and support for English-language papers only (additional languages coming soon)."
//       }
//     ]
//   };

//   // Sections for the sidebar
//   const sections = Object.keys(helpContent);

//   // Filter content based on search query
//   const getFilteredContent = () => {
//     if (!searchQuery.trim()) {
//       return helpContent[activeSection];
//     }
    
//     const query = searchQuery.toLowerCase();
//     let results = [];
    
//     // Search across all sections
//     Object.values(helpContent).forEach(section => {
//       section.forEach(item => {
//         if (
//           item.title.toLowerCase().includes(query) || 
//           item.content.toLowerCase().includes(query)
//         ) {
//           results.push(item);
//         }
//       });
//     });
    
//     return results;
//   };

//   const filteredContent = getFilteredContent();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
//       {/* Main Header with Navigation Tabs */}
//       <Sidebar />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Left sidebar - Help topics */}
//         <div className="w-1/5 p-3 border-r border-indigo-900  flex flex-col">
//           <div className="mb-3 flex-1">
//             <h2 className="text-lg font-semibold text-indigo-300 mb-2">Help Center</h2>
//             <p className="text-xs text-gray-400 mb-3">Get the most out of Re-Assist</p>
            
//             <div className="relative">
//               <input
//                 className="w-full  text-white p-1.5 rounded-md mb-3 border border-gray-700 focus:border-indigo-500 focus:outline-none pl-7 text-xs"
//                 placeholder="Search help topics..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-3 w-3 absolute left-2 top-2.5 text-gray-400" 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               {searchQuery && (
//                 <button 
//                   className="absolute right-2 top-2 text-gray-400 hover:text-white"
//                   onClick={() => setSearchQuery("")}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               )}
//             </div>
          
//             <div className="mt-3">
//               <h3 className="text-xs font-medium text-indigo-300 mb-1">Help Topics</h3>
//               <ul className="space-y-0.5">
//                 {sections.map((section) => (
//                   <li 
//                     key={section}
//                     className={`flex items-center px-2 py-0.5 text-xs rounded cursor-pointer ${
//                       activeSection === section && !searchQuery
//                         ? "bg-indigo-900 text-indigo-200" 
//                         : "hover: text-gray-300"
//                     }`}
//                     onClick={() => {
//                       setActiveSection(section);
//                       setSearchQuery("");
//                     }}
//                   >
//                     {section}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
          
//           {/* Logout button at bottom with profile symbol */}
//           <div className="flex items-center justify-between  hover:bg-gray-700 text-white px-3 py-1.5 rounded-md transition-colors text-xs">
//             <div className="flex items-center">
//               <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <span>User</span>
//             </div>
//             <button onClick={handleLogout}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 p-3 overflow-y-auto ">
//           <div className="flex justify-between items-center mb-3">
//             <h2 className="text-lg font-semibold text-indigo-300">
//               {searchQuery ? "Search Results" : activeSection}
//             </h2>
//             <div>
//               {searchQuery && (
//                 <span className="text-xs text-gray-400">
//                   Found {filteredContent.length} result{filteredContent.length !== 1 ? 's' : ''}
//                 </span>
//               )}
//             </div>
//           </div>
          
//           <div className="space-y-4">
//             {filteredContent.length > 0 ? (
//               filteredContent.map((item, index) => (
//                 <div key={index} className=" p-3 rounded-md">
//                   <h3 className="font-semibold text-md mb-2 text-indigo-300">{item.title}</h3>
//                   <p className="text-gray-300 text-sm">{item.content}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-6">
//                 <p className="text-gray-400 text-sm">No help topics found matching your search.</p>
//                 <button 
//                   className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm"
//                   onClick={() => setSearchQuery("")}
//                 >
//                   Clear search
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right panel - Video tutorials and quick links */}
//         <div className="w-1/5 p-3 border-l border-indigo-900 flex flex-col overflow-hidden ">
//           <div className="flex justify-between items-center mb-2">
//             <div className="font-semibold text-indigo-300 text-sm">Resources</div>
//             <button className="text-white text-xs bg-gray-700 p-0.5 rounded">⚙️</button>
//           </div>
          
//           <div className="flex-1 overflow-y-auto space-y-3 pr-1">
//             <div className=" p-2 rounded-md">
//               <h3 className="font-semibold text-xs mb-1 text-indigo-300">Video Tutorials</h3>
//               <ul className="space-y-2">
//                 {[
//                   "Getting Started with Re-Assist", 
//                   "Adding and Managing Papers", 
//                   "Advanced Chat Techniques", 
//                   "Creating Documents from Research"
//                 ].map((title, idx) => (
//                   <li 
//                     key={idx} 
//                     className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded cursor-pointer flex items-center"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span className="text-xs">{title}</span>
//                   </li>
//                 ))}
//               </ul>
//               <button className="mt-1 text-indigo-400 text-xs hover:text-indigo-300 w-full text-right">
//                 View all videos →
//               </button>
//             </div>

//             <div className=" p-2 rounded-md">
//               <h3 className="font-semibold text-xs mb-1 text-indigo-300">Quick Links</h3>
//               <ul className="space-y-0.5 text-xs">
//                 <li className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer">Documentation</li>
//                 <li className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer">API Reference</li>
//                 <li className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer">Community Forum</li>
//                 <li className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer">Feature Requests</li>
//                 <li className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer">Changelog</li>
//               </ul>
//             </div>

//             <div className=" p-2 rounded-md">
//               <h3 className="font-semibold text-xs mb-1 text-indigo-300">Need More Help?</h3>
//               <p className="text-xs text-gray-300 mb-2">Our support team is ready to assist you with any questions.</p>
//               <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md text-xs">
//                 Contact Support
//               </button>
//               <div className="mt-1 text-center text-xs text-gray-400">
//                 Support hours: Mon-Fri, 9am-6pm ET
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// File: src/components/HelpComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function HelpComponent() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Getting Started");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  
  // Help topics organized by section
  const helpContent = {
    "Getting Started": [
      {
        title: "Welcome to Re-Assist",
        content: "Re-Assist is an AI-powered research assistant that helps you organize papers, extract insights, and accelerate your research workflow. This guide will help you get the most out of the platform."
      },
      {
        title: "Creating Your First Project",
        content: "To get started, navigate to the Chats tab and click the '+ New Project' button. Give your project a name related to your research topic. Once created, you can add papers to your project."
      },
      {
        title: "Adding Papers",
        content: "There are multiple ways to add papers to your project: search our database, provide URLs to papers (e.g., from arXiv), or upload PDF files directly by dragging and dropping them."
      },
      {
        title: "Asking Questions",
        content: "Once you've added papers to your project, you can ask questions about them in the chat interface. Re-Assist will analyze your papers and provide insights, summaries, and answers based on the content."
      }
    ],
    "Projects & Papers": [
      {
        title: "Managing Multiple Projects",
        content: "You can create and manage multiple research projects. Each project can contain a different set of papers, allowing you to organize your research by topic, publication, or any other criteria."
      },
      {
        title: "Supported Paper Formats",
        content: "Re-Assist supports PDF, DOC, DOCX, and TXT file formats. For best results with PDFs, ensure they are text-searchable and not scanned images."
      },
      {
        title: "Organizing Papers",
        content: "Within each project, you can categorize papers, add notes, and highlight important sections. This helps you keep track of key information and quickly locate relevant content."
      },
      {
        title: "Paper Analysis",
        content: "Re-Assist automatically analyzes your papers to extract key information such as authors, publication date, abstract, methodology, results, and references. This makes it easier to find specific information."
      }
    ],
    "Chat & Citations": [
      {
        title: "Conversational Interface",
        content: "The chat interface allows you to have a natural conversation with Re-Assist about your papers. You can ask questions, request summaries, or explore specific topics mentioned in your papers."
      },
      {
        title: "Citation Highlighting",
        content: "When Re-Assist provides information from your papers, it includes citations to the source. Enable 'citation:highlight' to see exactly where the information comes from."
      },
      {
        title: "Citation Formats",
        content: "Re-Assist supports multiple citation formats including IEEE, APA, MLA, and Chicago. You can select your preferred format using the dropdown menu in the chat interface."
      },
      {
        title: "Complex Queries",
        content: "You can ask complex questions that span multiple papers. For example, 'What are the common findings across all these papers regarding neural network architectures?'"
      }
    ],
    "Document Management": [
      {
        title: "Creating Documents",
        content: "In the Documents tab, you can create new documents based on your research. These can be notes, literature reviews, research proposals, or any other type of document."
      },
      {
        title: "Templates",
        content: "Re-Assist provides various templates to help you get started with common document types like research proposals, literature reviews, and methodology sections."
      },
      {
        title: "Collaborative Editing",
        content: "You can share documents with collaborators, allowing for real-time editing and commenting. This makes it easy to work on research papers or proposals with colleagues."
      },
      {
        title: "Export Options",
        content: "Documents can be exported in multiple formats including PDF, DOCX, and LaTeX. This makes it easy to use your content in other applications or for submission to journals."
      }
    ],
    "Grants & Conferences": [
      {
        title: "Finding Funding Opportunities",
        content: "The Grants tab helps you discover relevant funding opportunities based on your research interests. You can filter by funding agency, deadline, and research area."
      },
      {
        title: "Conference Tracking",
        content: "In the Conferences tab, you can keep track of important academic conferences in your field. Set reminders for submission deadlines and receive notifications."
      },
      {
        title: "Grant Writing Assistance",
        content: "Re-Assist can help you draft sections of grant proposals based on your research papers. It can generate summaries, literature reviews, and methodology descriptions."
      },
      {
        title: "Conference Paper Preparation",
        content: "Prepare conference submissions with Re-Assist's help. Generate abstracts, outlines, and first drafts based on your existing research to speed up the submission process."
      }
    ],
    "Account Settings": [
      {
        title: "Profile Management",
        content: "Manage your profile information including name, email, and password. You can also update your research interests and preferences."
      },
      {
        title: "Subscription Plans",
        content: "View and manage your subscription plan. Re-Assist offers various tiers designed for individual researchers, teams, and institutions."
      },
      {
        title: "Security Settings",
        content: "Set up two-factor authentication, manage API keys, and review your account activity to keep your research data secure."
      },
      {
        title: "Notification Preferences",
        content: "Control which notifications you receive and how they're delivered. Get alerts for important deadlines, new grant opportunities, or when collaborators make changes."
      }
    ],
    "Troubleshooting": [
      {
        title: "Common Issues",
        content: "Solutions to common problems such as file upload errors, search issues, or performance concerns."
      },
      {
        title: "Contact Support",
        content: "Can't find what you're looking for? Contact our support team at support@reassist.ai or use the built-in chat support feature."
      },
      {
        title: "System Requirements",
        content: "Re-Assist works best on modern browsers including Chrome, Firefox, Safari, and Edge. For optimal performance, we recommend at least 8GB of RAM and a high-speed internet connection."
      },
      {
        title: "Known Limitations",
        content: "Current limitations include a maximum of 50 papers per project, file size limits of 50MB per upload, and support for English-language papers only (additional languages coming soon)."
      }
    ]
  };

  // Sections for the sidebar
  const sections = Object.keys(helpContent);

  // Filter content based on search query
  const getFilteredContent = () => {
    if (!searchQuery.trim()) {
      return helpContent[activeSection];
    }
    
    const query = searchQuery.toLowerCase();
    let results = [];
    
    // Search across all sections
    Object.values(helpContent).forEach(section => {
      section.forEach(item => {
        if (
          item.title.toLowerCase().includes(query) || 
          item.content.toLowerCase().includes(query)
        ) {
          results.push(item);
        }
      });
    });
    
    return results;
  };

  const filteredContent = getFilteredContent();

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowProfileOptions(false);
    navigate("/dashboard/profile"); // Navigate to the profile page within dashboard
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Help topics */}
        <div className="w-1/5 p-3 border-r border-gray-200 bg-white flex flex-col">
          <div className="mb-3 flex-1">
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">Help Center</h2>
            <p className="text-xs text-gray-500 mb-3">Get the most out of Re-Assist</p>
            
            <div className="relative">
              <input
                className="w-full bg-gray-100 text-gray-800 p-1.5 rounded-md mb-3 border border-gray-300 focus:border-indigo-500 focus:outline-none pl-7 text-xs"
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 absolute left-2 top-2.5 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button 
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setSearchQuery("")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          
            <div className="mt-3">
              <h3 className="text-xs font-medium text-indigo-700 mb-1">Help Topics</h3>
              <ul className="space-y-0.5">
                {sections.map((section) => (
                  <li 
                    key={section}
                    className={`flex items-center px-2 py-0.5 text-xs rounded cursor-pointer ${
                      activeSection === section && !searchQuery
                        ? "bg-indigo-100 text-indigo-700" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => {
                      setActiveSection(section);
                      setSearchQuery("");
                    }}
                  >
                    {section}
                  </li>
                ))}
              </ul>
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
        <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-indigo-700">
              {searchQuery ? "Search Results" : activeSection}
            </h2>
            <div>
              {searchQuery && (
                <span className="text-xs text-gray-500">
                  Found {filteredContent.length} result{filteredContent.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredContent.length > 0 ? (
              filteredContent.map((item, index) => (
                <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                  <h3 className="font-semibold text-md mb-2 text-indigo-700">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm">No help topics found matching your search.</p>
                <button 
                  className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right panel - Video tutorials and quick links */}
        <div className="w-1/5 p-3 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-indigo-700 text-sm">Resources</div>
            <button className="text-gray-700 text-xs bg-gray-100 p-0.5 rounded">⚙️</button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <div className="bg-gray-50 p-2 rounded-md">
              <h3 className="font-semibold text-xs mb-1 text-indigo-700">Video Tutorials</h3>
              <ul className="space-y-2">
                {[
                  "Getting Started with Re-Assist", 
                  "Adding and Managing Papers", 
                  "Advanced Chat Techniques", 
                  "Creating Documents from Research"
                ].map((title, idx) => (
                  <li 
                    key={idx} 
                    className="bg-white hover:bg-gray-100 border border-gray-200 p-1.5 rounded cursor-pointer flex items-center shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-700">{title}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-1 text-indigo-600 text-xs hover:text-indigo-700 w-full text-right">
                View all videos →
              </button>
            </div>

            <div className="bg-gray-50 p-2 rounded-md">
              <h3 className="font-semibold text-xs mb-1 text-indigo-700">Quick Links</h3>
              <ul className="space-y-0.5 text-xs">
                <li className="text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">Documentation</li>
                <li className="text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">API Reference</li>
                <li className="text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">Community Forum</li>
                <li className="text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">Feature Requests</li>
                <li className="text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">Changelog</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-2 rounded-md">
              <h3 className="font-semibold text-xs mb-1 text-indigo-700">Need More Help?</h3>
              <p className="text-xs text-gray-700 mb-2">Our support team is ready to assist you with any questions.</p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md text-xs">
                Contact Support
              </button>
              <div className="mt-1 text-center text-xs text-gray-500">
                Support hours: Mon-Fri, 9am-6pm ET
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}