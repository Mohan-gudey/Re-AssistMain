// // File: src/components/ResearchProfilePage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function ResearchProfilePage() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("articles");
//   const [sortOrder, setSortOrder] = useState("citations");
//   const [yearRange, setYearRange] = useState("all");
  
//   // Hardcoded profile data
//   const profileData = {
//     name: "Dr. Jane Smith",
//     affiliation: "Stanford University, Department of Computer Science",
//     interests: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Human-Computer Interaction"],
//     stats: {
//       citations: 8437,
//       hIndex: 42,
//       i10Index: 98
//     },
//     coauthors: [
//       { name: "John Doe", affiliation: "MIT", imgSrc: "/api/placeholder/30/30" },
//       { name: "Alice Johnson", affiliation: "Google Research", imgSrc: "/api/placeholder/30/30" },
//       { name: "Robert Chen", affiliation: "Stanford University", imgSrc: "/api/placeholder/30/30" },
//       { name: "Maria Garcia", affiliation: "UC Berkeley", imgSrc: "/api/placeholder/30/30" },
//       { name: "James Wilson", affiliation: "DeepMind", imgSrc: "/api/placeholder/30/30" }
//     ]
//   };

//   // Hardcoded publications data
//   const publications = [
//     {
//       title: "Attention Is All You Need",
//       authors: "Jane Smith, John Doe, Alice Johnson",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2023,
//       citations: 54236,
//       isStarred: true
//     },
//     {
//       title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
//       authors: "Jane Smith, Robert Chen, Maria Garcia",
//       journal: "NAACL",
//       year: 2022,
//       citations: 35918,
//       isStarred: true
//     },
//     {
//       title: "Deep Residual Learning for Image Recognition",
//       authors: "Jane Smith, James Wilson",
//       journal: "IEEE Conference on Computer Vision and Pattern Recognition",
//       year: 2021,
//       citations: 28733,
//       isStarred: false
//     },
//     {
//       title: "GPT-3: Language Models are Few-Shot Learners",
//       authors: "Jane Smith, Alice Johnson, James Wilson",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2020,
//       citations: 12437,
//       isStarred: true
//     },
//     {
//       title: "Distributed Representations of Words and Phrases and their Compositionality",
//       authors: "Jane Smith, John Doe",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2019,
//       citations: 19743,
//       isStarred: false
//     },
//     {
//       title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
//       authors: "Jane Smith, Maria Garcia",
//       journal: "International Conference on Machine Learning",
//       year: 2018,
//       citations: 14352,
//       isStarred: false
//     },
//     {
//       title: "Generative Adversarial Networks",
//       authors: "Jane Smith, Robert Chen",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2017,
//       citations: 29651,
//       isStarred: true
//     }
//   ];

//   // Sort publications based on selected order
//   const sortedPublications = [...publications].sort((a, b) => {
//     if (sortOrder === "citations") {
//       return b.citations - a.citations;
//     } else if (sortOrder === "year") {
//       return b.year - a.year;
//     } else if (sortOrder === "title") {
//       return a.title.localeCompare(b.title);
//     }
//     return 0;
//   });

//   // Filter publications by year range
//   const filteredPublications = sortedPublications.filter(pub => {
//     if (yearRange === "all") return true;
//     if (yearRange === "since2020") return pub.year >= 2020;
//     if (yearRange === "since2018") return pub.year >= 2018;
//     if (yearRange === "custom") {
//       // For a custom range implementation, we would add date pickers
//       return true;
//     }
//     return true;
//   });

//   // Citation data for charts (by year)
//   const citationsByYear = [
//     { year: 2017, citations: 750 },
//     { year: 2018, citations: 1230 },
//     { year: 2019, citations: 1850 },
//     { year: 2020, citations: 1480 },
//     { year: 2021, citations: 1620 },
//     { year: 2022, citations: 1120 },
//     { year: 2023, citations: 387 }
//   ];

//   const handleBackToHome = () => {
//     navigate("/dashboard/chats"); // Navigate back to chats component
//   };

//   const toggleStar = (index) => {
//     // In a real app, you would update the database here
//     // For this demo, we'll just show what would happen
//     alert(`Publication "${publications[index].title}" ${publications[index].isStarred ? "un-starred" : "starred"}`);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         <div className="w-full p-6 overflow-y-auto ">
//           {/* Back Button */}
//           <button 
//             className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 text-sm"
//             onClick={handleBackToHome}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back
//           </button>

//           {/* Profile Header */}
//           <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
//             {/* Profile Image */}
//             <div className="flex-shrink-0">
//               <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-5xl font-bold">
//                 JS
//               </div>
//             </div>

//             {/* Profile Info */}
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-indigo-300 mb-2">{profileData.name}</h1>
//               <p className="text-gray-400 mb-3">{profileData.affiliation}</p>
              
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {profileData.interests.map((interest, idx) => (
//                   <span key={idx} className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium">
//                     {interest}
//                   </span>
//                 ))}
//               </div>

//               {/* Citation Metrics */}
//               <div className=" rounded-lg p-4 shadow-md mb-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-indigo-300">{profileData.stats.citations}</h3>
//                     <p className="text-sm text-gray-400">Citations</p>
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-indigo-300">{profileData.stats.hIndex}</h3>
//                     <p className="text-sm text-gray-400">h-index</p>
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-indigo-300">{profileData.stats.i10Index}</h3>
//                     <p className="text-sm text-gray-400">i10-index</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Citation Graph (simplified) */}
//               <div className=" rounded-lg p-4 shadow-md">
//                 <h3 className="text-sm font-semibold text-indigo-300 mb-2">Citations per Year</h3>
//                 <div className="h-20 w-full flex items-end justify-between gap-1">
//                   {citationsByYear.map((data, idx) => (
//                     <div key={idx} className="flex flex-col items-center">
//                       <div 
//                         className="w-8 bg-indigo-600 hover:bg-indigo-500 transition-colors"
//                         style={{ height: `${(data.citations / 2000) * 100}%`, minHeight: '4px' }}
//                       ></div>
//                       <span className="text-xs text-gray-400 mt-1">{data.year}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="border-b border-indigo-900 mb-6">
//             <div className="flex space-x-4">
//               <button
//                 className={`pb-2 px-1 text-sm font-medium ${activeTab === "articles" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
//                 onClick={() => setActiveTab("articles")}
//               >
//                 Articles
//               </button>
//               <button
//                 className={`pb-2 px-1 text-sm font-medium ${activeTab === "coauthors" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
//                 onClick={() => setActiveTab("coauthors")}
//               >
//                 Co-authors
//               </button>
//             </div>
//           </div>

//           {/* Articles Tab Content */}
//           {activeTab === "articles" && (
//             <>
//               {/* Filters */}
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//                 <div className="flex items-center gap-3">
//                   <label className="text-gray-400 text-sm">Sort by:</label>
//                   <select
//                     value={sortOrder}
//                     onChange={(e) => setSortOrder(e.target.value)}
//                     className=" text-white border border-indigo-900 rounded py-1 px-2 text-sm focus:outline-none focus:border-indigo-600"
//                   >
//                     <option value="citations">Citations</option>
//                     <option value="year">Year (newest)</option>
//                     <option value="title">Title</option>
//                   </select>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <label className="text-gray-400 text-sm">Year range:</label>
//                   <select
//                     value={yearRange}
//                     onChange={(e) => setYearRange(e.target.value)}
//                     className=" text-white border border-indigo-900 rounded py-1 px-2 text-sm focus:outline-none focus:border-indigo-600"
//                   >
//                     <option value="all">All</option>
//                     <option value="since2020">Since 2020</option>
//                     <option value="since2018">Since 2018</option>
//                     <option value="custom">Custom range</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Publications List */}
//               <div className="space-y-6">
//                 {filteredPublications.map((pub, idx) => (
//                   <div key={idx} className=" rounded-lg p-4 shadow-md hover:bg-gray-750 transition-colors">
//                     <div className="flex justify-between mb-2">
//                       <h3 className="text-indigo-300 font-semibold">{pub.title}</h3>
//                       <button 
//                         className="text-gray-400 hover:text-indigo-300"
//                         onClick={() => toggleStar(idx)}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={pub.isStarred ? "currentColor" : "none"} stroke="currentColor">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-400 mb-1">{pub.authors}</p>
//                     <p className="text-sm text-gray-500 mb-3">{pub.journal}, {pub.year}</p>
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-2 text-sm">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                         </svg>
//                         <span className="text-indigo-400">{pub.citations} citations</span>
//                       </div>
//                       <button className="text-sm text-indigo-400 hover:text-indigo-300">
//                         View
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Co-authors Tab Content */}
//           {activeTab === "coauthors" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {profileData.coauthors.map((author, idx) => (
//                 <div key={idx} className=" rounded-lg p-4 shadow-md flex items-center gap-4 hover:bg-gray-750 transition-colors">
//                   <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
//                     <img src={author.imgSrc} alt={author.name} className="w-full h-full object-cover" />
//                   </div>
//                   <div>
//                     <h3 className="text-indigo-300 font-medium">{author.name}</h3>
//                     <p className="text-sm text-gray-400">{author.affiliation}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// // File: src/components/ResearchProfilePage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function ResearchProfilePage() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("articles");
//   const [sortOrder, setSortOrder] = useState("citations");
//   const [yearRange, setYearRange] = useState("all");
  
//   // Hardcoded profile data
//   const profileData = {
//     name: "Dr. Jane Smith",
//     affiliation: "Stanford University, Department of Computer Science",
//     interests: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Human-Computer Interaction"],
//     stats: {
//       citations: 8437,
//       hIndex: 42,
//       i10Index: 98
//     },
//     coauthors: [
//       { name: "John Doe", affiliation: "MIT", imgSrc: "/api/placeholder/30/30" },
//       { name: "Alice Johnson", affiliation: "Google Research", imgSrc: "/api/placeholder/30/30" },
//       { name: "Robert Chen", affiliation: "Stanford University", imgSrc: "/api/placeholder/30/30" },
//       { name: "Maria Garcia", affiliation: "UC Berkeley", imgSrc: "/api/placeholder/30/30" },
//       { name: "James Wilson", affiliation: "DeepMind", imgSrc: "/api/placeholder/30/30" }
//     ]
//   };

//   // Hardcoded publications data
//   const publications = [
//     {
//       title: "Attention Is All You Need",
//       authors: "Jane Smith, John Doe, Alice Johnson",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2023,
//       citations: 54236,
//       isStarred: true
//     },
//     {
//       title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
//       authors: "Jane Smith, Robert Chen, Maria Garcia",
//       journal: "NAACL",
//       year: 2022,
//       citations: 35918,
//       isStarred: true
//     },
//     {
//       title: "Deep Residual Learning for Image Recognition",
//       authors: "Jane Smith, James Wilson",
//       journal: "IEEE Conference on Computer Vision and Pattern Recognition",
//       year: 2021,
//       citations: 28733,
//       isStarred: false
//     },
//     {
//       title: "GPT-3: Language Models are Few-Shot Learners",
//       authors: "Jane Smith, Alice Johnson, James Wilson",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2020,
//       citations: 12437,
//       isStarred: true
//     },
//     {
//       title: "Distributed Representations of Words and Phrases and their Compositionality",
//       authors: "Jane Smith, John Doe",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2019,
//       citations: 19743,
//       isStarred: false
//     },
//     {
//       title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
//       authors: "Jane Smith, Maria Garcia",
//       journal: "International Conference on Machine Learning",
//       year: 2018,
//       citations: 14352,
//       isStarred: false
//     },
//     {
//       title: "Generative Adversarial Networks",
//       authors: "Jane Smith, Robert Chen",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2017,
//       citations: 29651,
//       isStarred: true
//     }
//   ];

//   // Sort publications based on selected order
//   const sortedPublications = [...publications].sort((a, b) => {
//     if (sortOrder === "citations") {
//       return b.citations - a.citations;
//     } else if (sortOrder === "year") {
//       return b.year - a.year;
//     } else if (sortOrder === "title") {
//       return a.title.localeCompare(b.title);
//     }
//     return 0;
//   });

//   // Filter publications by year range
//   const filteredPublications = sortedPublications.filter(pub => {
//     if (yearRange === "all") return true;
//     if (yearRange === "since2020") return pub.year >= 2020;
//     if (yearRange === "since2018") return pub.year >= 2018;
//     if (yearRange === "custom") {
//       // For a custom range implementation, we would add date pickers
//       return true;
//     }
//     return true;
//   });

//   // Citation data for charts (by year)
//   const citationsByYear = [
//     { year: 2017, citations: 750 },
//     { year: 2018, citations: 1230 },
//     { year: 2019, citations: 1850 },
//     { year: 2020, citations: 1480 },
//     { year: 2021, citations: 1620 },
//     { year: 2022, citations: 1120 },
//     { year: 2023, citations: 387 }
//   ];

//   const handleBackToHome = () => {
//     navigate("/dashboard/chats"); // Navigate back to chats component
//   };

//   const toggleStar = (index) => {
//     // In a real app, you would update the database here
//     // For this demo, we'll just show what would happen
//     alert(`Publication "${publications[index].title}" ${publications[index].isStarred ? "un-starred" : "starred"}`);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-white text-gray-800 font-sans overflow-hidden ">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex max-w-7xl mx-auto overflow-hidden">
//         <div className="w-full p-6 overflow-y-auto">
//           {/* Back Button */}
//           <button 
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 text-sm"
//             onClick={handleBackToHome}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back
//           </button>

//           {/* Profile Header */}
//           <div className="flex flex-col md:flex-row items-start gap-6 mb-8 ">
//             {/* Profile Image */}
//             <div className="flex-shrink-0">
//               <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-5xl font-bold text-white">
//                 JS
//               </div>
//             </div>

//             {/* Profile Info */}
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-blue-700 mb-2">{profileData.name}</h1>
//               <p className="text-gray-600 mb-3">{profileData.affiliation}</p>
              
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {profileData.interests.map((interest, idx) => (
//                   <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
//                     {interest}
//                   </span>
//                 ))}
//               </div>

//               {/* Citation Metrics */}
//               <div className="bg-gray-50 rounded-lg p-4 shadow-md mb-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-blue-700">{profileData.stats.citations}</h3>
//                     <p className="text-sm text-gray-500">Citations</p>
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-blue-700">{profileData.stats.hIndex}</h3>
//                     <p className="text-sm text-gray-500">h-index</p>
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-blue-700">{profileData.stats.i10Index}</h3>
//                     <p className="text-sm text-gray-500">i10-index</p>
//                   </div>
//                 </div>
//               </div>

              
//               {/* Citation Graph (simplified) */}
//               <div className="bg-gray-50 rounded-lg p-4 shadow-md">
//                 <h3 className="text-sm font-semibold text-blue-700 mb-2">Citations per Year</h3>
//                 <div className="h-20 w-full flex items-end justify-between gap-1">
//                   {citationsByYear.map((data, idx) => (
//                     <div key={idx} className="flex flex-col items-center">
//                       <div 
//                         className="w-8 bg-blue-500 hover:bg-blue-600 transition-colors"
//                         style={{ height: `${(data.citations / 2000) * 100}%`, minHeight: '4px' }}
//                       ></div>
//                       <span className="text-xs text-gray-500 mt-1">{data.year}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="border-b border-gray-200 mb-6">
//             <div className="flex space-x-4">
//               <button
//                 className={`pb-2 px-1 text-sm font-medium ${activeTab === "articles" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
//                 onClick={() => setActiveTab("articles")}
//               >
//                 Articles
//               </button>
//               <button
//                 className={`pb-2 px-1 text-sm font-medium ${activeTab === "coauthors" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
//                 onClick={() => setActiveTab("coauthors")}
//               >
//                 Co-authors
//               </button>
//             </div>
//           </div>

//           {/* Articles Tab Content */}
//           {activeTab === "articles" && (
//             <>
//               {/* Filters */}
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//                 <div className="flex items-center gap-3">
//                   <label className="text-gray-600 text-sm">Sort by:</label>
//                   <select
//                     value={sortOrder}
//                     onChange={(e) => setSortOrder(e.target.value)}
//                     className="bg-white text-gray-800 border border-gray-300 rounded py-1 px-2 text-sm focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="citations">Citations</option>
//                     <option value="year">Year (newest)</option>
//                     <option value="title">Title</option>
//                   </select>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <label className="text-gray-600 text-sm">Year range:</label>
//                   <select
//                     value={yearRange}
//                     onChange={(e) => setYearRange(e.target.value)}
//                     className="bg-white text-gray-800 border border-gray-300 rounded py-1 px-2 text-sm focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="all">All</option>
//                     <option value="since2020">Since 2020</option>
//                     <option value="since2018">Since 2018</option>
//                     <option value="custom">Custom range</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Publications List */}
//               <div className="space-y-6">
//                 {filteredPublications.map((pub, idx) => (
//                   <div key={idx} className="bg-gray-50 rounded-lg p-4 shadow-md hover:bg-gray-100 transition-colors">
//                     <div className="flex justify-between mb-2">
//                       <h3 className="text-blue-700 font-semibold">{pub.title}</h3>
//                       <button 
//                         className="text-gray-500 hover:text-blue-700"
//                         onClick={() => toggleStar(idx)}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={pub.isStarred ? "currentColor" : "none"} stroke="currentColor">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-1">{pub.authors}</p>
//                     <p className="text-sm text-gray-500 mb-3">{pub.journal}, {pub.year}</p>
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-2 text-sm">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                         </svg>
//                         <span className="text-blue-600">{pub.citations} citations</span>
//                       </div>
//                       <button className="text-sm text-blue-600 hover:text-blue-800">
//                         View
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Co-authors Tab Content */}
//           {activeTab === "coauthors" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {profileData.coauthors.map((author, idx) => (
//                 <div key={idx} className="bg-gray-50 rounded-lg p-4 shadow-md flex items-center gap-4 hover:bg-gray-100 transition-colors">
//                   <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
//                     <img src={author.imgSrc} alt={author.name} className="w-full h-full object-cover" />
//                   </div>
//                   <div>
//                     <h3 className="text-blue-700 font-medium">{author.name}</h3>
//                     <p className="text-sm text-gray-600">{author.affiliation}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// // File: src/components/ResearchProfilePage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function ResearchProfilePage() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("articles");
//   const [sortOrder, setSortOrder] = useState("citations");
//   const [yearRange, setYearRange] = useState("all");
//   const [showProfileOptions, setShowProfileOptions] = useState(false);
  
//   // Hardcoded profile data
//   const profileData = {
//     name: "Dr. Jane Smith",
//     affiliation: "Stanford University, Department of Computer Science",
//     interests: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Human-Computer Interaction"],
//     stats: {
//       citations: 8437,
//       hIndex: 42,
//       i10Index: 98
//     },
//     coauthors: [
//       { name: "John Doe", affiliation: "MIT", imgSrc: "/api/placeholder/30/30" },
//       { name: "Alice Johnson", affiliation: "Google Research", imgSrc: "/api/placeholder/30/30" },
//       { name: "Robert Chen", affiliation: "Stanford University", imgSrc: "/api/placeholder/30/30" },
//       { name: "Maria Garcia", affiliation: "UC Berkeley", imgSrc: "/api/placeholder/30/30" },
//       { name: "James Wilson", affiliation: "DeepMind", imgSrc: "/api/placeholder/30/30" }
//     ]
//   };

//   // Hardcoded publications data
//   const publications = [
//     {
//       title: "Attention Is All You Need",
//       authors: "Jane Smith, John Doe, Alice Johnson",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2023,
//       citations: 54236,
//       isStarred: true
//     },
//     {
//       title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
//       authors: "Jane Smith, Robert Chen, Maria Garcia",
//       journal: "NAACL",
//       year: 2022,
//       citations: 35918,
//       isStarred: true
//     },
//     {
//       title: "Deep Residual Learning for Image Recognition",
//       authors: "Jane Smith, James Wilson",
//       journal: "IEEE Conference on Computer Vision and Pattern Recognition",
//       year: 2021,
//       citations: 28733,
//       isStarred: false
//     },
//     {
//       title: "GPT-3: Language Models are Few-Shot Learners",
//       authors: "Jane Smith, Alice Johnson, James Wilson",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2020,
//       citations: 12437,
//       isStarred: true
//     },
//     {
//       title: "Distributed Representations of Words and Phrases and their Compositionality",
//       authors: "Jane Smith, John Doe",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2019,
//       citations: 19743,
//       isStarred: false
//     },
//     {
//       title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
//       authors: "Jane Smith, Maria Garcia",
//       journal: "International Conference on Machine Learning",
//       year: 2018,
//       citations: 14352,
//       isStarred: false
//     },
//     {
//       title: "Generative Adversarial Networks",
//       authors: "Jane Smith, Robert Chen",
//       journal: "Advances in Neural Information Processing Systems",
//       year: 2017,
//       citations: 29651,
//       isStarred: true
//     }
//   ];

//   // Sort publications based on selected order
//   const sortedPublications = [...publications].sort((a, b) => {
//     if (sortOrder === "citations") {
//       return b.citations - a.citations;
//     } else if (sortOrder === "year") {
//       return b.year - a.year;
//     } else if (sortOrder === "title") {
//       return a.title.localeCompare(b.title);
//     }
//     return 0;
//   });

//   // Filter publications by year range
//   const filteredPublications = sortedPublications.filter(pub => {
//     if (yearRange === "all") return true;
//     if (yearRange === "since2020") return pub.year >= 2020;
//     if (yearRange === "since2018") return pub.year >= 2018;
//     if (yearRange === "custom") {
//       // For a custom range implementation, we would add date pickers
//       return true;
//     }
//     return true;
//   });

//   // Citation data for charts (by year)
//   const citationsByYear = [
//     { year: 2017, citations: 750 },
//     { year: 2018, citations: 1230 },
//     { year: 2019, citations: 1850 },
//     { year: 2020, citations: 1480 },
//     { year: 2021, citations: 1620 },
//     { year: 2022, citations: 1120 },
//     { year: 2023, citations: 387 }
//   ];

//   const handleBackToHome = () => {
//     navigate("/dashboard/chats"); // Navigate back to chats component
//   };

//   const toggleStar = (index) => {
//     // In a real app, you would update the database here
//     // For this demo, we'll just show what would happen
//     alert(`Publication "${publications[index].title}" ${publications[index].isStarred ? "un-starred" : "starred"}`);
//   };
  
//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleProfileClick = () => {
//     setShowProfileOptions(false);
//     navigate("/dashboard/profile"); // Navigate to the profile page within dashboard
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
//       {/* Main Header with Navigation Tabs */}
//       <Sidebar />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Left sidebar */}
//         <div className="w-1/5 p-3 border-r border-gray-200 flex flex-col">
//           <div className="mb-4 flex-1">
//             <h2 className="text-lg font-semibold text-blue-700 mb-3">Research Profile</h2>
//             <p className="text-sm text-gray-600 mb-3">Manage your research profile and publications</p>
            
//             <div className="space-y-2">
//               <button 
//                 onClick={handleBackToHome}
//                 className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 text-sm"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                 </svg>
//                 Back to Dashboard
//               </button>
//             </div>
          
//             <div className="mt-6">
//               <h3 className="text-sm font-medium text-blue-700 mb-2">Quick Links</h3>
//               <ul className="space-y-1">
//                 <li 
//                   className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   Edit Profile
//                 </li>
//                 <li 
//                   className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   Add Publication
//                 </li>
//                 <li 
//                   className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   Manage Citations
//                 </li>
//                 <li 
//                   className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   Export Profile
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           {/* Logout button at bottom with profile symbol */}
//           <div className="relative">
//             <button 
//               className="flex items-center justify-between w-full bg-white hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md transition-colors text-xs border border-gray-300"
//               onClick={() => setShowProfileOptions(prev => !prev)}
//             >
//               <div className="flex items-center">
//                 <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 text-white">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span>User</span>
//               </div>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
            
//             {/* Dropdown Menu */}
//             {showProfileOptions && (
//               <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-md shadow-lg border border-blue-200 overflow-hidden z-10">
//                 <button 
//                   className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
//                   onClick={handleProfileClick}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
//                   </svg>
//                   Profile
//                 </button>
//                 <button 
//                   className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 transition-colors text-left"
//                   onClick={() => {
//                     setShowProfileOptions(false);
//                     handleLogout();
//                   }}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                   </svg>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 p-4 overflow-y-auto">
//           {/* Profile Header */}
//           <div className="bg-white rounded-md shadow-sm p-4 mb-4">
//             <div className="flex flex-col md:flex-row items-start gap-6">
//               {/* Profile Image */}
//               <div className="flex-shrink-0">
//                 <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
//                   JS
//                 </div>
//               </div>

//               {/* Profile Info */}
//               <div className="flex-1">
//                 <h1 className="text-xl font-bold text-blue-700 mb-2">{profileData.name}</h1>
//                 <p className="text-gray-600 mb-3 text-sm">{profileData.affiliation}</p>
                
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {profileData.interests.map((interest, idx) => (
//                     <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
//                       {interest}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Citation Metrics */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div className="text-center bg-gray-50 p-2 rounded-md">
//                     <h3 className="text-lg font-bold text-blue-700">{profileData.stats.citations}</h3>
//                     <p className="text-xs text-gray-500">Citations</p>
//                   </div>
//                   <div className="text-center bg-gray-50 p-2 rounded-md">
//                     <h3 className="text-lg font-bold text-blue-700">{profileData.stats.hIndex}</h3>
//                     <p className="text-xs text-gray-500">h-index</p>
//                   </div>
//                   <div className="text-center bg-gray-50 p-2 rounded-md">
//                     <h3 className="text-lg font-bold text-blue-700">{profileData.stats.i10Index}</h3>
//                     <p className="text-xs text-gray-500">i10-index</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Citation Graph (simplified) */}
//             <div className="mt-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">Citations per Year</h3>
//               <div className="h-16 w-full flex items-end justify-between gap-1">
//                 {citationsByYear.map((data, idx) => (
//                   <div key={idx} className="flex flex-col items-center">
//                     <div 
//                       className="w-6 bg-blue-600 hover:bg-blue-700 transition-colors rounded-t"
//                       style={{ height: `${(data.citations / 2000) * 100}%`, minHeight: '4px' }}
//                     ></div>
//                     <span className="text-xs text-gray-500 mt-1">{data.year}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="bg-white rounded-md shadow-sm p-4">
//             <div className="border-b border-gray-200 mb-4">
//               <div className="flex space-x-6">
//                 <button
//                   className={`pb-2 px-1 text-sm font-medium ${activeTab === "articles" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
//                   onClick={() => setActiveTab("articles")}
//                 >
//                   Articles
//                 </button>
//                 <button
//                   className={`pb-2 px-1 text-sm font-medium ${activeTab === "coauthors" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
//                   onClick={() => setActiveTab("coauthors")}
//                 >
//                   Co-authors
//                 </button>
//               </div>
//             </div>

//             {/* Articles Tab Content */}
//             {activeTab === "articles" && (
//               <>
//                 {/* Filters */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
//                   <div className="flex items-center gap-2">
//                     <label className="text-gray-600 text-xs">Sort by:</label>
//                     <select
//                       value={sortOrder}
//                       onChange={(e) => setSortOrder(e.target.value)}
//                       className="bg-white text-gray-800 border border-gray-300 rounded py-1 px-2 text-xs focus:outline-none focus:border-blue-500"
//                     >
//                       <option value="citations">Citations</option>
//                       <option value="year">Year (newest)</option>
//                       <option value="title">Title</option>
//                     </select>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <label className="text-gray-600 text-xs">Year range:</label>
//                     <select
//                       value={yearRange}
//                       onChange={(e) => setYearRange(e.target.value)}
//                       className="bg-white text-gray-800 border border-gray-300 rounded py-1 px-2 text-xs focus:outline-none focus:border-blue-500"
//                     >
//                       <option value="all">All</option>
//                       <option value="since2020">Since 2020</option>
//                       <option value="since2018">Since 2018</option>
//                       <option value="custom">Custom range</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Publications List */}
//                 <div className="space-y-3">
//                   {filteredPublications.map((pub, idx) => (
//                     <div key={idx} className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors border border-gray-200">
//                       <div className="flex justify-between mb-1">
//                         <h3 className="text-blue-700 font-medium text-sm">{pub.title}</h3>
//                         <button 
//                           className="text-gray-400 hover:text-blue-600"
//                           onClick={() => toggleStar(idx)}
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={pub.isStarred ? "currentColor" : "none"} stroke="currentColor">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         </button>
//                       </div>
//                       <p className="text-xs text-gray-600 mb-1">{pub.authors}</p>
//                       <p className="text-xs text-gray-500 mb-2">{pub.journal}, {pub.year}</p>
//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center gap-1 text-xs">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                           </svg>
//                           <span className="text-blue-600">{pub.citations} citations</span>
//                         </div>
//                         <button className="text-xs text-blue-600 hover:text-blue-800">
//                           View
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* Co-authors Tab Content */}
//             {activeTab === "coauthors" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {profileData.coauthors.map((author, idx) => (
//                   <div key={idx} className="bg-gray-50 rounded-md p-3 flex items-center gap-3 hover:bg-gray-100 transition-colors border border-gray-200">
//                     <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
//                       <img src={author.imgSrc} alt={author.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div>
//                       <h3 className="text-blue-700 font-medium text-sm">{author.name}</h3>
//                       <p className="text-xs text-gray-600">{author.affiliation}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import EditProfile from "./EditProfile";

export default function ResearchProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("articles");
  const [sortOrder, setSortOrder] = useState("citations");
  const [yearRange, setYearRange] = useState("all");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");

  // Fetch user profile on mount
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const firebaseId = localStorage.getItem("firebaseId");
  //     if (!firebaseId) {
  //       setError("No Firebase ID found.");
  //       setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`https://re-assist-backend.onrender.com/api/profiles/profile?firebaseId=${firebaseId}`);
  //       const data = await response.json();
  //       console.log("profile data",data)

  //       if (!response.ok) {
  //         throw new Error(data.message || "Failed to fetch profile.");
  //       }

  //       setProfileData(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  useEffect(() => {
    const firebaseId = localStorage.getItem("firebaseId");
    if (firebaseId) {
      // In a real app, you would check verification status from your backend
      // For demo purposes, we'll assume email is not verified initially
      setIsEmailVerified(false);
    }
  }, []);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const firebaseId = localStorage.getItem("firebaseId");
      if (!firebaseId) {
        setError("No Firebase ID found.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://re-assist-backend.onrender.com/api/profiles/profile?firebaseId=${firebaseId}`);
        const data = await response.json();
        console.log("profile data", data)

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile.");
        }

        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Dummy function to send verification code
  const sendVerificationCode = () => {
    // In a real app, this would send an email to the user
    // For demo, we'll just show a success message
    setVerificationStatus("Verification code sent to your email!");
    setShowVerificationModal(true);
  };

  // Dummy function to verify code
  const verifyCode = () => {
    // In a real app, this would check against the code sent to the user
    // For demo, any 6-digit code will work
    if (verificationCode.length === 6) {
      setIsEmailVerified(true);
      setVerificationStatus("Email verified successfully!");
      setTimeout(() => {
        setShowVerificationModal(false);
      }, 2000);
    } else {
      setVerificationStatus("Invalid code. Please try again.");
    }
  };

  const publications = [
    {
      title: "Attention Is All You Need",
      authors: `${profileData?.fullName || "Loading..."}, John Doe, Alice Johnson`,
      journal: "Advances in Neural Information Processing Systems",
      year: 2023,
      citations: 54236,
      isStarred: true
    },
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: `${profileData?.fullName || "Loading..."}, Robert Chen, Maria Garcia`,
      journal: "NAACL",
      year: 2022,
      citations: 35918,
      isStarred: true
    },
    {
      title: "Deep Residual Learning for Image Recognition",
      authors: `${profileData?.fullName || "Loading..."}, James Wilson`,
      journal: "IEEE Conference on Computer Vision and Pattern Recognition",
      year: 2021,
      citations: 28733,
      isStarred: false
    },
    {
      title: "GPT-3: Language Models are Few-Shot Learners",
      authors: `${profileData?.fullName || "Loading..."}, Alice Johnson, James Wilson`,
      journal: "Advances in Neural Information Processing Systems",
      year: 2020,
      citations: 12437,
      isStarred: true
    },
    {
      title: "Distributed Representations of Words and Phrases and their Compositionality",
      authors: `${profileData?.fullName || "Loading..."}, John Doe`,
      journal: "Advances in Neural Information Processing Systems",
      year: 2019,
      citations: 19743,
      isStarred: false
    }
  ];
  // Citation data for charts (by year)
  const citationsByYear = [
    { year: 2017, citations: 750 },
    { year: 2018, citations: 1230 },
    { year: 2019, citations: 1850 },
    { year: 2020, citations: 1480 },
    { year: 2021, citations: 1620 },
    { year: 2022, citations: 1120 },
    { year: 2023, citations: 387 }
  ];

  const handleProfileSave = (updatedProfile) => {
    setProfileData(updatedProfile);
    setEditing(false);
  };
  
  
  const sortedPublications = [...publications].sort((a, b) => {
    if (sortOrder === "citations") return b.citations - a.citations;
    if (sortOrder === "year") return b.year - a.year;
    if (sortOrder === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const filteredPublications = sortedPublications.filter(pub => {
    if (yearRange === "all") return true;
    if (yearRange === "since2020") return pub.year >= 2020;
    if (yearRange === "since2018") return pub.year >= 2018;
    return true;
  });

  const handleBackToHome = () => {
        navigate("/dashboard/chats"); // Navigate back to chats component
      };


  const handleEditProfile = () => {
    navigate("/dashboard/edit-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firebaseId');
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowProfileOptions(false);
    navigate("/dashboard/profile");
  };

  // Show loading state while profile data is being fetched
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-gray-700">Loading profile data...</p>
      </div>
    );
  }

  // Show error state if there's an issue fetching profile data
  if (error) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded max-w-md">
          <p className="text-red-700">Error loading profile: {error}</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Verify Your Email</h3>
            {!isEmailVerified ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a 6-digit verification code to your email address. 
                  Please enter it below to verify your email.
                </p>
                <div className="mb-4">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={6}
                  />
                </div>
                {verificationStatus && (
                  <p className={`text-sm mb-4 ${verificationStatus.includes("success") ? "text-green-600" : "text-red-600"}`}>
                    {verificationStatus}
                  </p>
                )}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={verifyCode}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Verify
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-green-600 font-medium">{verificationStatus}</p>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email Verification Banner (only show if email is not verified) */}
      {!isEmailVerified && !showVerificationModal && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-600 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-yellow-800">
                Your email is not verified. Please verify your email to access all features.
              </span>
            </div>
            <button
              onClick={sendVerificationCode}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Verify Now
            </button>
          </div>
        </div>
      )}
      {/* Main Header with Navigation Tabs */}
      {/* Main Header with Navigation Tabs */}
      <Sidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-1/5 p-3 border-r border-gray-200 flex flex-col">
          <div className="mb-4 flex-1">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">Research Profile</h2>
            <p className="text-sm text-gray-600 mb-3">Manage your research profile and publications</p>
            
            <div className="space-y-2">
              <button 
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Dashboard
              </button>
            </div>
          
            <div className="mt-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Quick Links</h3>
              <ul className="space-y-1">
              <li
                className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </li>
                {/* <li 
                  className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  Add Publication
                </li>
                <li 
                  className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  Manage Citations
                </li>
                <li 
                  className="flex items-center px-2 py-1 text-xs rounded hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  Export Profile
                </li> */}
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
                <span>{profileData?.fullName?.split(' ')[0] || 'User'}</span>
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
  onClick={handleLogout}
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 4a1 1 0 000 2h10a1 1 0 100-2H3zm10 6a1 1 0 00-1-1H7.414l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L7.414 11H12a1 1 0 001-1z" clipRule="evenodd" />
  </svg>
  Logout
</button>

              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-y-auto">
        {editing ? (
  <EditProfile profileData={profileData} onSave={handleProfileSave} />
) : (
         <>
          {/* Profile Header */}
          <div className="bg-white rounded-md shadow-sm p-4 mb-4">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Profile Image - Using initials from fullName */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {profileData?.fullName?.split(' ').map(name => name[0]).join('') || 'U'}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-blue-700 mb-2">{profileData?.fullName || 'User'}</h1>
                  <button 
                    onClick={() => setEditing(true)}
                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      
                    </svg>
                    
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-600 mb-3 text-sm">
                  {profileData?.position ? `${profileData.position}, ` : ''}
                  {profileData?.institution || 'No institution specified'}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData?.researchInterests?.map((interest, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Bio Section */}
                {profileData?.bio && (
                  <div className="mb-4 text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                    <h3 className="text-xs font-semibold text-blue-700 mb-1">Bio</h3>
                    <p>{profileData.bio}</p>
                  </div>
                )}

                {/* Citation Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center bg-gray-50 p-2 rounded-md">
                    <h3 className="text-lg font-bold text-blue-700">{profileData?.stats?.citations || 0}</h3>
                    <p className="text-xs text-gray-500">Citations</p>
                  </div>
                  <div className="text-center bg-gray-50 p-2 rounded-md">
                    <h3 className="text-lg font-bold text-blue-700">{profileData?.stats?.hIndex || 0}</h3>
                    <p className="text-xs text-gray-500">h-index</p>
                  </div>
                  <div className="text-center bg-gray-50 p-2 rounded-md">
                    <h3 className="text-lg font-bold text-blue-700">{profileData?.stats?.i10Index || 0}</h3>
                    <p className="text-xs text-gray-500">i10-index</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Citation Graph (simplified) */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-blue-700 mb-2">Citations per Year</h3>
              <div className="h-16 w-full flex items-end justify-between gap-1">
                {citationsByYear.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div 
                      className="w-6 bg-blue-600 hover:bg-blue-700 transition-colors rounded-t"
                      style={{ height: `${(data.citations / 2000) * 100}%`, minHeight: '4px' }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{data.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </>
       )}
          {/* Tabs */}
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="border-b border-gray-200 mb-4">
              <div className="flex space-x-6">
                <button
                  className={`pb-2 px-1 text-sm font-medium ${activeTab === "articles" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("articles")}
                >
                  Articles
                </button>
                {/* <button
                  className={`pb-2 px-1 text-sm font-medium ${activeTab === "coauthors" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("coauthors")}
                >
                  Co-authors
                </button> */}
              </div>
            </div>

            {/* Articles Tab Content */}
            {activeTab === "articles" && (
              <>
                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-xs">Sort by:</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="bg-white text-gray-800 border border-gray-300 rounded py-1 px-2 text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="citations">Citations</option>
                      <option value="year">Year (newest)</option>
                      <option value="title">Title</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-xs">Year range:</label>
                    <select
                      value={yearRange}
                      onChange={(e) => setYearRange(e.target.value)}
                      className="bg-white text-gray-800 border border-gray-300 rounded py-1 px-2 text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All</option>
                      <option value="since2020">Since 2020</option>
                      <option value="since2018">Since 2018</option>
                      <option value="custom">Custom range</option>
                    </select>
                  </div>
                </div>

                {/* Publications List */}
                <div className="space-y-3">
                  {filteredPublications.length > 0 ? (
                    filteredPublications.map((pub, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors border border-gray-200">
                        <div className="flex justify-between mb-1">
                          <h3 className="text-blue-700 font-medium text-sm">{pub.title}</h3>
                          <button 
                            className="text-gray-400 hover:text-blue-600"
                            onClick={() => toggleStar(idx)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={pub.isStarred ? "currentColor" : "none"} stroke="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{pub.authors}</p>
                        <p className="text-xs text-gray-500 mb-2">{pub.journal}, {pub.year}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <span className="text-blue-600">{pub.citations} citations</span>
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            View
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No publications match your criteria</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Co-authors Tab Content */}
            {activeTab === "coauthors" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profileData?.coauthors?.length > 0 ? (
                  profileData.coauthors.map((author, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-md p-3 flex items-center gap-3 hover:bg-gray-100 transition-colors border border-gray-200">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                        {author.imgSrc ? 
                          <img src={author.imgSrc} alt={author.name} className="w-full h-full object-cover" /> : 
                          author.name.split(' ').map(n => n[0]).join('')
                        }
                      </div>
                      <div>
                        <h3 className="text-blue-700 font-medium text-sm">{author.name}</h3>
                        <p className="text-xs text-gray-600">{author.affiliation}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 col-span-2">
                    <p className="text-gray-500">No co-authors found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}