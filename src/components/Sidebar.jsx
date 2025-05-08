// // src/components/Sidebar.js
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaBrain } from 'react-icons/fa';
// import FeedbackForm from "./FeedbackForm";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
  
//   const openFeedback = () => {
//     setFeedbackOpen(true);
//   };

//   const closeFeedback = () => {
//     setFeedbackOpen(false);
//   };
  
//   // Tab definitions with their routes - defined AFTER openFeedback is declared
//   const tabs = [
//     { name: "Chats", path: "/dashboard/chats" },
//     { name: "Documents", path: "/dashboard/documents" },
//     { name: "Grants", path: "/dashboard/grants" },
//     { name: "Conferences", path: "/dashboard/conferences" },
//     { name: "Help", path: "/dashboard/help" },
//     { name: "Feedback", path: "/dashboard/feedback", action: openFeedback }
//   ];

//   const handleTabClick = (tab) => {
//     if (tab.action) {
//       tab.action();
//     } else {
//       navigate(tab.path);
//     }
//   };

//   return (
//     <>
//       <div className="bg-indigo-950 p-4 border-b border-indigo-800">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2">
//               <FaBrain className="text-white text-lg" />
//             </div>
//             <span className="text-xl font-semibold text-indigo-300">RE-ASSIST</span>
//           </div>
//           <div className="flex space-x-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.name}
//                 className={`px-4 py-2 rounded-md ${
//                   currentPath === tab.path || (currentPath === "/app" && tab.path === "/")
//                     ? "bg-indigo-600 font-semibold"
//                     : "hover:bg-indigo-900 text-indigo-200"
//                 }`}
//                 onClick={() => handleTabClick(tab)}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </div>
//           <div className="w-32">
//             {/* Empty div for balance */}
//           </div>
//         </div>
//       </div>
      
//       {/* Feedback Modal */}
//       <FeedbackForm isOpen={feedbackOpen} onClose={closeFeedback} />
//     </>
//   );
// }



// // src/components/Sidebar.js
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaBrain } from 'react-icons/fa';
// import FeedbackForm from "./FeedbackForm";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
  
//   const openFeedback = () => {
//     setFeedbackOpen(true);
//   };

//   const closeFeedback = () => {
//     setFeedbackOpen(false);
//   };
  
//   // Tab definitions with their routes - including Collaborators
//   const tabs = [
//     { name: "Chats", path: "/dashboard/chats" },
//     { name: "Documents", path: "/dashboard/documents" },
//     { name: "Collaborators", path: "/dashboard/collaborators" }, // Add collaborators tab
//     { name: "Grants", path: "/dashboard/grants" },
//     { name: "Conferences", path: "/dashboard/conferences" },
//     { name: "Help", path: "/dashboard/help" },
//     { name: "Feedback", path: "/dashboard/feedback", action: openFeedback }
//   ];

//   const handleTabClick = (tab) => {
//     if (tab.action) {
//       tab.action();
//     } else {
//       navigate(tab.path);
//     }
//   };

//   return (
//     <>
//       <div className="bg-indigo-950 p-4 border-b border-indigo-800">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2">
//               <FaBrain className="text-white text-lg" />
//             </div>
//             <span className="text-xl font-semibold text-indigo-300">RE-ASSIST</span>
//           </div>
//           <div className="flex space-x-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.name}
//                 className={`px-4 py-2 rounded-md ${
//                   currentPath === tab.path || (currentPath === "/dashboard" && tab.path === "/dashboard/chats")
//                     ? "bg-indigo-600 font-semibold"
//                     : "hover:bg-indigo-900 text-indigo-200"
//                 }`}
//                 onClick={() => handleTabClick(tab)}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </div>
//           <div className="w-32">
//             {/* Empty div for balance */}
//           </div>
//         </div>
//       </div>
      
//       {/* Feedback Modal */}
//       <FeedbackForm isOpen={feedbackOpen} onClose={closeFeedback} />
//     </>
//   );
// }



// // src/components/Sidebar.js
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaBrain } from 'react-icons/fa';
// import FeedbackForm from "./FeedbackForm";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
  
//   const openFeedback = () => {
//     setFeedbackOpen(true);
//   };

//   const closeFeedback = () => {
//     setFeedbackOpen(false);
//   };
  
//   // Tab definitions with their routes - including Collaborators
//   const tabs = [
//     { name: "Chats", path: "/dashboard/chats" },
//     { name: "Documents", path: "/dashboard/documents" },
//     { name: "Collaborators", path: "/dashboard/collaborators" }, // Add collaborators tab
//     { name: "Grants", path: "/dashboard/grants" },
//     { name: "Conferences", path: "/dashboard/conferences" },
//     { name: "Help", path: "/dashboard/help" },
//     { name: "Feedback", path: "/dashboard/feedback", action: openFeedback }
//   ];

//   const handleTabClick = (tab) => {
//     if (tab.action) {
//       tab.action();
//     } else {
//       navigate(tab.path);
//     }
//   };

//   return (
//     <>
//       <div className="bg-blue-50 p-4 border-b border-blue-200 shadow-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2 shadow-sm">
//               <FaBrain className="text-white text-lg" />
//             </div>
//             <span className="text-xl font-semibold text-blue-700">RE-ASSIST</span>
//           </div>
//           <div className="flex space-x-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.name}
//                 className={`px-4 py-2 rounded-md transition-colors ${
//                   currentPath === tab.path || (currentPath === "/dashboard" && tab.path === "/dashboard/chats")
//                     ? "bg-blue-500 text-white font-semibold shadow-sm"
//                     : "hover:bg-blue-100 text-blue-700"
//                 }`}
//                 onClick={() => handleTabClick(tab)}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </div>
//           <div className="w-32">
//             {/* Empty div for balance */}
//           </div>
//         </div>
//       </div>
      
//       {/* Feedback Modal */}
//       <FeedbackForm isOpen={feedbackOpen} onClose={closeFeedback} />
//     </>
//   );
// }

// src/components/Sidebar.js
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaBrain } from 'react-icons/fa';
// import FeedbackForm from "./FeedbackForm";
// import { IoIosNotifications } from "react-icons/io";
// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [feedbackOpen, setFeedbackOpen] = useState(false);

//   // Get user role from localStorage
//   const userRole = localStorage.getItem("userRole"); // e.g., 'user' or 'admin'
//   const useremail = localStorage.getItem("email");
//   console.log("role:",useremail)
//   const openFeedback = () => {
//     setFeedbackOpen(true);
//   };

//   const closeFeedback = () => {
//     setFeedbackOpen(false);
//   };

//   // All tab definitions
//   const allTabs = [
//     { name: "Chats", path: "/dashboard/chats" },
//     { name: "Documents", path: "/dashboard/documents" },
//     { name: "Collaborators", path: "/dashboard/collaborators" },
//     { name: "Grants", path: "/dashboard/grants" },
//     { name: "Conferences", path: "/dashboard/conferences" },
//     { name: "Help", path: "/dashboard/help" },
//     { name: "Feedback", path: "/dashboard/feedback", action: openFeedback }
//   ];

//   // Filter tabs based on user role
//   const tabs = allTabs.filter(tab => {
//     if (userRole === "admin") return true; // Admin sees all tabs
//     // User only sees specific tabs
//     return ["Chats", "Documents", "Help", "Feedback"].includes(tab.name);
//   });

//   const handleTabClick = (tab) => {
//     if (tab.action) {
//       tab.action();
//     } else {
//       navigate(tab.path);
//     }
//   };

//   return (
//     <>
//       <div className="bg-blue-50 p-4 border-b border-blue-200 shadow-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2 shadow-sm">
//               <FaBrain className="text-white text-lg" />
//             </div>
//             <span className="text-xl font-semibold text-blue-700">RE-ASSIST</span>
//           </div>
//           <div className="flex space-x-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.name}
//                 className={`px-4 py-2 rounded-md transition-colors ${
//                   currentPath === tab.path || (currentPath === "/dashboard" && tab.path === "/dashboard/chats")
//                     ? "bg-blue-500 text-white font-semibold shadow-sm"
//                     : "hover:bg-blue-100 text-blue-700"
//                 }`}
//                 onClick={() => handleTabClick(tab)}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </div>
//           <div className="w-32">
//             {/* Empty div for balance */}
//             <span>
//               <IoIosNotifications className="text-2xl" />
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Feedback Modal */}
//       <FeedbackForm isOpen={feedbackOpen} onClose={closeFeedback} />
//     </>
//   );
// }
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBrain } from 'react-icons/fa';
import { IoIosNotifications } from "react-icons/io";
import FeedbackForm from "./FeedbackForm";
import FeatureRequestForm from './FeatureRequestForm';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [featureRequestOpen, setFeatureRequestOpen] = useState(false);
  // Mock notifications (replace with real ones)
  const notifications = [
    "New document uploaded",
    "Collaborator added you",
    "Your grant has been approved"
  ];

  const useremail = localStorage.getItem("email");
  console.log("role:", useremail);

  const openFeedback = () => setFeedbackOpen(true);
  const closeFeedback = () => setFeedbackOpen(false);

  const openFeatureRequest = () => setFeatureRequestOpen(true);
  const closeFeatureRequest = () => setFeatureRequestOpen(false);

  const allTabs = [
    { name: "Chats", path: "/dashboard/chats" },
    { name: "Documents", path: "/dashboard/documents" },
    { name: "Collaborators", path: "/dashboard/collaborators" },
    { name: "Grants", path: "/dashboard/grants" },
    { name: "Conferences", path: "/dashboard/conferences" },
    { name: "Help", path: "/dashboard/help" },
    { name: "Feedback", path: "/dashboard/feedback", action: openFeedback },
    { name: "Feature Request", path: "/dashboard/feature-request", action: openFeatureRequest },
  ];

  const handleTabClick = (tab) => {
    if (tab.action) {
      tab.action();
    } else {
      navigate(tab.path);
    }
  };

  return (
    <>
      <div className="bg-blue-50 p-4 border-b border-blue-200 shadow-sm relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2 shadow-sm">
              <FaBrain className="text-white text-lg" />
            </div>
            <span className="text-xl font-semibold text-blue-700">RE-ASSIST</span>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6">
            {allTabs.map((tab) => (
              <button
                key={tab.name}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPath === tab.path || (currentPath === "/dashboard" && tab.path === "/dashboard/chats")
                    ? "bg-blue-500 text-white font-semibold shadow-sm"
                    : "hover:bg-blue-100 text-blue-700"
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Notification Icon */}
          <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
            <IoIosNotifications className="text-2xl text-blue-700" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 shadow-md">
                {notifications.length}
              </span>
            )}

            {/* Modern Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-up">
                <div className="px-4 py-3 bg-blue-50 border-b border-gray-200 font-semibold text-blue-700 text-sm">
                  Notifications
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                  {notifications.length > 0 ? (
                    notifications.map((note, index) => (
                      <div
                        key={index}
                        className="flex items-start px-4 py-3 hover:bg-blue-50 transition duration-150 ease-in-out"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3"></div>
                        <div className="text-sm text-gray-800">{note}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-sm text-gray-500 text-center">No new notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackForm isOpen={feedbackOpen} onClose={closeFeedback} />
      <FeatureRequestForm isOpen={featureRequestOpen} onClose={closeFeatureRequest} />
    </>
  );
}
