
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import apiClient from "../utils/apiClient";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";
import bibtexParse from "bibtex-parse-js";
import { FaComments, FaFileAlt, FaFilePdf, FaMoneyCheckAlt, FaUniversity, FaTrashAlt } from "react-icons/fa";
import { extractTextFromFile, analyzeWithGroq } from './pdf/utils/aiUtils';

export default function ChatsComponent() {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  const [showPaperOptions, setShowPaperOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [paperUrl, setPaperUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [activePaper, setActivePaper] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [recommendations, setRecommendations] = useState([
    "Check out 'Attention Is All You Need' for transformer architecture",
    "Recent paper: 'Scaling Vision Transformers to 22 Billion Parameters'",
    "Popular: 'Large Language Models Encode Clinical Knowledge'"
  ]);

  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [rawText, setRawText] = useState('');
  
  
    const [userName, setUserName] = useState("User");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      const fetchUserName = async () => {
        const firebaseId = localStorage.getItem("firebaseId");
        if (!firebaseId) {
          setError("No Firebase ID found.");
          setIsLoading(false);
          return;
        }

        try {
          const response = await fetch(`https://re-assist-backend.onrender.com/api/profiles/profile?firebaseId=${firebaseId}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch profile.");
          }

          if (data.fullName) {
            setUserName(data.fullName);
          } else {
            setUserName("User");
          }
        } catch (err) {
          console.error("Error fetching profile:", err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserName();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [projectIdToDelete, setProjectIdToDelete] = useState(null);
    const [activeBibEntry, setActiveBibEntry] = useState(null);
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);
    const [paperIdToDelete, setPaperIdToDelete] = useState(null);
    const [bibIdToDelete, setBibIdToDelete] = useState(null);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
    const [middleView, setMiddleView] = useState("default"); // can be "default", "summary", "chat", "grants", "conferences" // Default view
    const dropdownRefs = useRef([]);
    const [expandedPaper, setExpandedPaper] = useState({
      projectIndex: null,
      paperIndex: null,
    });
    const [expandedBibEntry, setExpandedBibEntry] = useState({ projectIndex: null, bibIndex: null });
      useEffect(() => {
        if (selectedProjectIndex !== null) {
          setMiddleView("default");
        }
      }, [selectedProjectIndex]);
      
    useEffect(() => {
      const fetchData = async () => {
        if (selectedProjectIndex === null) return;
  
        try {
          const response = await axios.get(
            "https://export.arxiv.org/api/query?search_query=ti:%22LLM%20code%22&sortBy=lastUpdatedDate&sortOrder=ascending"
          );
          // Parse the XML response
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, "application/xml");
          const entries = Array.from(xmlDoc.querySelectorAll("entry")).map((entry) => {
            const title = entry.querySelector("title")?.textContent.trim() || "No Title";
            const authors = Array.from(entry.querySelectorAll("author name")).map(
              (author) => author.textContent
            );
            const publishedDate = entry.querySelector("published")?.textContent || "Unknown Date";
            const summary = entry.querySelector("summary")?.textContent.trim() || "No Abstract";
            const link = entry.querySelector("id")?.textContent || "#";
            return { title, authors, publishedDate, summary, link };
          });
          setPapers(entries);
         
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch data from arXiv API.");
          setLoading(false);
        }
      };
      fetchData();
    }, [selectedProjectIndex]);
    // Add paper to the selected project and save it in the backend
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        
        if (dropdownOpenIndex !== null) {
          const dropdownEl = dropdownRefs.current[dropdownOpenIndex];
          if (dropdownEl && !dropdownEl.contains(event.target)) {
            setDropdownOpenIndex(null);
          }
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownOpenIndex]);
    
    const addPaperToProject = async (paper) => {
      if (selectedProjectIndex === null) {
        alert("Please select a project first.");
        return;
      }
  
      try {
        const projectId = projects[selectedProjectIndex]._id;
        const token = localStorage.getItem("token");
        localStorage.setItem('token', token);
        // Save paper in the backend
        const paperResponse = await fetch("https://re-assist-backend.onrender.com/api/papers/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: paper.title,
            url: paper.link,
          }),
        });
  
        const paperResult = await paperResponse.json();
        if (!paperResponse.ok) {
          throw new Error(paperResult.error || "Failed to save paper");
        }
  
        // Add paper to the project in the backend
        await fetch(`https://re-assist-backend.onrender.com/api/projects/${projectId}/add-paper`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paperId: paperResult.paper._id }),
        });
  
        // Update frontend state
        const updatedProjects = [...projects];
        updatedProjects[selectedProjectIndex].papers.push({
          title: paper.title,
          url: paper.link,
          id: paperResult.paper._id,
        });
        setProjects(updatedProjects);
  
        // Remove paper from Arxiv recommendations
        setPapers((prevPapers) => prevPapers.filter((p) => p.link !== paper.link));
  
        alert("Paper added successfully!");
      } catch (error) {
        console.error("Error adding paper:", error);
        alert(`Error: ${error.message}`);
      }
    };
  
  // Project management functions
  const handleNewProjectClick = () => {
    setShowInput(true);
    setProjectName("");
    setShowPaperOptions(false);
  };


  const handleSaveProject = async () => {
    if (!projectName.trim()) {
      alert("Please enter a valid project name.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("https://re-assist-backend.onrender.com/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: projectName }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to save project");
      }
      const result = await response.json();
      setProjects((prev) => [
        ...prev,
        { name: projectName, _id: result.project._id, papers: [] },
      ]);
      setShowInput(false);
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Error saving project:", error);
      alert(`Error: ${error.message}`);
    }
  };


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token
        localStorage.setItem('token', token);
        const response = await fetch("https://re-assist-backend.onrender.com/api/projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
  
        const result = await response.json();
        
        console.log(result)
        // Normalize the data to match frontend expectations
        const normalizedProjects = result.projects.map((project) => ({
          ...project,
          papers: project.papers || [], // Ensure papers is always an array
        }));
  
        setProjects(normalizedProjects);
        
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert(`Error: ${error.message}`);
      }
    };
  
    fetchProjects();
  }, []);

  const handleAddPaperByUrl = async () => {
    if (!paperUrl.trim()) {
      alert("Please enter a valid URL");
      return;
    }
    try {
      const response = await fetch("https://re-assist-backend.onrender.com/api/papers/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: paperUrl.split("/").pop() || "Untitled Paper",
          url: paperUrl,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Paper added successfully!");
        setPaperUrl("");
      } else {
        alert(`Error: ${result.error || "Failed to add paper"}`);
      }
    } catch (error) {
      console.error("Error adding paper:", error);
      alert("An error occurred while adding the paper.");
    }
  };

  const handleEditProjectName = (index, newName) => {
    const updatedProjects = [...projects];
    updatedProjects[index].name = newName;
    setProjects(updatedProjects);
  };
  const handleDeleteProject = async (e, projectId) => {
    e.stopPropagation();
    setProjectIdToDelete(projectId); // Store the project ID to delete
    setConfirmationMessage('Are you sure you want to delete this Project? This action cannot be undone.');
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleDeletePaper = async (e, projectId, paperId) => {
    e.stopPropagation();
    setProjectIdToDelete(projectId); // Store the project ID
    setPaperIdToDelete(paperId); // Store the paper ID
    setConfirmationMessage('Are you sure you want to delete this Paper? This action cannot be undone.');
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleDeleteBibEntry = async (e, projectId, bibId) => {
    e.stopPropagation();
    setProjectIdToDelete(projectId); // Store the project ID
    setBibIdToDelete(bibId); // Store the .bib entry ID
    setConfirmationMessage('Are you sure you want to delete this .bib entry? This action cannot be undone.');
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    if (paperIdToDelete !== null) {
      await confirmDeletePaper();
    } else if (bibIdToDelete !== null) {
      await confirmDeleteBibEntry();
    } else {
      await confirmDeleteProject();
    }
  };
  
  const confirmDeleteBibEntry = async () => {
    try {
      const bibId = bibIdToDelete;
      const projectId = projectIdToDelete;
      console.log('Deleting .bib entry with ID:', bibId, 'from project:', projectId);
  
      if (!projectId || !bibId) {
        console.error('Invalid project ID or .bib entry ID');
        alert('Invalid project ID or .bib entry ID. Please try again.');
        return;
      }
  
      // Call the backend API to delete the .bib entry
      const response = await apiClient.delete(`/api/projects/${projectId}/bib/${bibId}`);
      console.log('Response from backend:', response.data);
  
      // Remove the .bib entry from the local state
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                bibEntries: project.bibEntries.filter((bibEntry) => bibEntry._id !== bibId),
              }
            : project
        )
      );
    } catch (error) {
      console.error('Error deleting .bib entry:', error.response?.data || error.message);
      alert('Failed to delete the .bib entry. Please try again.');
    } finally {
      setIsModalOpen(false); // Close the modal
      setBibIdToDelete(null); // Reset the .bib entry ID
      setProjectIdToDelete(null); // Reset the project ID
    }
  };
  
  const confirmDeleteProject = async () => {
    try {
      // Call the backend API to delete the project
      await apiClient.delete(`/api/projects/${projectIdToDelete}`);

      // Remove the project from the local state
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectIdToDelete)
      );

      // Reset selected project and related states if necessary
      if (selectedProjectIndex === projectIdToDelete) {
        setSelectedProjectIndex(null);
        setActivePaper(null);
        setShowPaperOptions(false);
      } else if (selectedProjectIndex > projectIdToDelete) {
        setSelectedProjectIndex((prevIndex) => prevIndex - 1);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete the project. Please try again.');
    } finally {
      setIsModalOpen(false); // Close the modal after deletion
    }
  };
  const confirmDeletePaper = async () => {
    try {
      const paperId = paperIdToDelete;
      const projectId = projectIdToDelete;
  
      console.log('Deleting paper with ID:', paperId, 'from project:', projectId);
  
      if (!projectId || !paperId) {
        console.error('Invalid project ID or paper ID');
        alert('Invalid project ID or paper ID. Please try again.');
        return;
      }
  
      // Call the backend API to delete the paper
      const response = await apiClient.delete(`/api/projects/${projectId}/papers/${paperId}`);
      console.log('Response from backend:', response.data);
  
      // Remove the paper from the local state
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                papers: project.papers.filter((paper) => paper._id !== paperId),
              }
            : project
        )
      );
    } catch (error) {
      console.error('Error deleting paper:', error.response?.data || error.message);
      alert('Failed to delete the paper. Please try again.');
    } finally {
      setIsModalOpen(false); // Close the modal
      setPaperIdToDelete(null); // Reset the paper ID
      setProjectIdToDelete(null); // Reset the project ID
    }
  };
  
  const handleProjectSelect = (index) => {
    console.log("index data:", index);
    setSelectedProjectIndex(index);
    setShowPaperOptions(false);
    setActivePaper(null);
    setActiveBibEntry(null)
  };

  const handlePaperSelect = (paper, projectIndex, paperIndex) => {
  const selectedPaper = projects[projectIndex]?.papers[paperIndex];
  if (selectedPaper) {
    setActivePaper({
      name: selectedPaper.title || "Untitled Paper",
      url: selectedPaper.url,
      abstract:selectedPaper.abstract || '',
      keywords:selectedPaper.keywords || '',
      projectIndex,
      paperIndex,
    });
    setActiveBibEntry(null); // Clear active bib entry
  } else {
    console.error("Invalid paper selection");
  }
};


// Handle Bib Entry Selection
const handleBibEntrySelect = (bibEntry, projectIndex, bibIndex) => {
  const selectedBibEntry = projects[projectIndex]?.bibEntries[bibIndex];
  if (selectedBibEntry) {
    setActiveBibEntry({
      fields: selectedBibEntry.entry?.entryTags || {}, // Extract .bib metadata
      citationKey: selectedBibEntry.entry?.citationKey || "Unknown",
      entryType: selectedBibEntry.entry?.entryType || "Unknown",
      projectIndex,
      bibIndex,
    });
    setActivePaper(null); // Clear active paper
  } else {
    console.error("Invalid .bib entry selection");
  }
};

  const [droppedFiles, setDroppedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (
        e.dataTransfer.files &&
        e.dataTransfer.files.length > 0 &&
        selectedProjectIndex !== null
      ) {
        const files = Array.from(e.dataTransfer.files);
        setDroppedFiles(files);
      } else if (selectedProjectIndex === null) {
        alert("Please select a project first");
      }
    },
    [selectedProjectIndex]
  );

  const handleFileSelect = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const file = files[0];
    const fileName = file.name.toLowerCase();
    const allowedTypes = ['.pdf', '.docx', '.doc', '.txt', '.rtf', '.odt', '.md'];
    const fileExt = fileName.slice(fileName.lastIndexOf('.'));

    if (!allowedTypes.includes(fileExt)) {
      // alert(`Unsupported file type: ${fileExt}. Please upload a valid document.`);
      return;
    }

    setLoading(true);

    try {
      const text = await extractTextFromFile(file);
      setRawText(text);

      const { abstract, keywords } = await analyzeWithGroq(text);
      setAbstract(abstract);
      setKeywords(keywords.list || []);

      // 🔥 Log the AI results directly in ChatComponent
      console.log('✅ AI Extracted Data:');
      console.log('Abstract:', abstract);
      console.log('Keywords:', keywords.list || []);
      // console.log('Raw Text:', text);
    } catch (err) {
      console.error('❌ File processing failed:', err);
      alert('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleUploadFiles = async () => {
    if (selectedProjectIndex === null) {
      alert("Please select a project first.");
      return;
    }
  
    const filesToUpload = [...droppedFiles, ...selectedFiles];
    if (filesToUpload.length === 0) {
      alert("No files to upload.");
      return;
    }
  
    try {
      const projectId = projects[selectedProjectIndex]._id;
      const token = localStorage.getItem('token'); // Get the JWT token
  
      for (const file of filesToUpload) {
        if (file.type === "" && file.name.endsWith('.bib')) {
          // Handle .bib file
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const content = e.target.result;
              const parsedData = bibtexParse.toJSON(content); // Parse .bib content
  
              // Send parsed .bib data to the backend (no strict validation)
              const response = await fetch(`https://re-assist-backend.onrender.com/api/projects/${projectId}/add-bib`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ bibData: parsedData }),
              });
  
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to upload .bib file");
              }
  
              const result = await response.json();
             
            } catch (error) {
              console.error("Error uploading .bib file:", error);
              alert(`Error: ${error.message}`);
            }
          };
          reader.onerror = () => {
            alert("Error reading the .bib file.");
          };
          reader.readAsText(file);
        } else {
          // Handle other file types (PDF, DOCX, etc.)
          const formData = new FormData();
          formData.append("files", file);

          // Append metadata
          formData.append("title", file.name);
          formData.append("abstract", abstract?.text || '');
          formData.append("keywords", JSON.stringify(keywords));
  
          const response = await fetch("https://re-assist-backend.onrender.com/api/papers/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to upload files");
          }
  
          const result = await response.json();
          for (const paper of result.papers) {
            await fetch(`https://re-assist-backend.onrender.com/api/projects/${projectId}/add-paper`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ paperId: paper._id }),
            });
          }
        }
      }
  
      // Clear uploaded files
      setDroppedFiles([]);
      setSelectedFiles([]);
      alert("All files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleProfileClick = () => {
    setShowProfileOptions(false);
    navigate("/dashboard/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("authStatus");
    localStorage.removeItem('token');
    localStorage.removeItem('firebaseId');
    localStorage.removeItem('isNewUser');
    navigate("/");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  const topics = [
    'CV',
    'LLM',
    'Code Generation',
    'Object Recognition',
    'ML',
    'Semantic Embeddings',
    'Evaluation',
  ];
  
  const getRandomTopics = (count = 2) => {
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const conferences = [
    { name: "International Conference on Machine Learning", date: "July 23-29, 2025", location: "Vienna, Austria", tag: "Machine Learning" },
    { name: "ACM Conference on AI Ethics", date: "September 15-18, 2025", location: "San Francisco, USA", tag: "AI Ethics" },
    { name: "Conference on Computer Vision and Pattern Recognition", date: "June 18-22, 2025", location: "Seattle, USA", tag: "Computer Vision" },
    { name: "Neural Information Processing Systems", date: "December 5-12, 2025", location: "Montreal, Canada", tag: "Machine Learning" },
    { name: "International Conference on Robotics and Automation", date: "May 30 - June 5, 2025", location: "Tokyo, Japan", tag: "Robotics" },
    { name: "European Conference on Artificial Intelligence", date: "August 25-29, 2025", location: "Amsterdam, Netherlands", tag: "Artificial Intelligence" },
  ];

  const grants = [
    { name: "NSF AI Research Grant", type: "Federal", deadline: "May 15, 2025", amount: "$500,000" },
    { name: "NIH Medical AI Innovation", type: "Federal", deadline: "June 30, 2025", amount: "$750,000" },
    { name: "DOE Energy Systems AI", type: "Federal", deadline: "July 10, 2025", amount: "$1,200,000" },
    { name: "Gates Foundation Global Health AI", type: "Foundation", deadline: "August 5, 2025", amount: "$950,000" },
    { name: "Microsoft Research AI Ethics", type: "Industry", deadline: "September 12, 2025", amount: "$350,000" },
    { name: "European Research Council AI Grant", type: "International", deadline: "October 30, 2025", amount: "€800,000" },
  ];
  
  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 font-sans overflow-hidden">
      {/* Main Header with Navigation Tabs */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Projects - Reduced width */}
        <div className="w-1/5 p-3 border-r border-blue-200 flex flex-col overflow-hidden bg-gray-100">
          <div className="flex-1 overflow-y-auto mb-3">
            <div>
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all mb-4 text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              onClick={handleNewProjectClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Project
            </button>
            </div>
            {showInput && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg p-6 w-full max-w-5xl shadow-lg border border-blue-200">
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">New Project</h2>

                  <label className="block text-sm font-medium text-blue-600 mb-1">Title</label>
                  <input
                    className="w-full mb-3 p-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter title"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />

                  <label className="block text-sm font-medium text-blue-600 mb-1">Description</label>
                  <textarea
                    className="w-full mb-4 p-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={3}
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowInput(false)}
                      className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}
            <ul className="space-y-2">
              {projects.length > 0 && (
                <div className="text-xs mb-3">
                  <div className="mb-2 font-semibold text-blue-700 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    Saved Projects
                  </div>
                  <ul className="space-y-2">
                  {projects.map((project, index) => (
                    <li
                      key={project._id}
                      className={`bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                        selectedProjectIndex === index
                          ? "border-l-4 border-blue-500 pl-1.5 shadow-md"
                          : "pl-2"
                      }`}
                      onClick={() => {
                        handleProjectSelect(index);
                        setExpandedProjectIndex(expandedProjectIndex === index ? null : index);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <h2
                          className={`bg-transparent focus:outline-none ${
                            selectedProjectIndex === index
                              ? "text-blue-700 font-bold text-sm"
                              : "text-gray-800 text-[0.8rem] font-bold"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectSelect(index);
                            setExpandedProjectIndex(expandedProjectIndex === index ? null : index);
                          }}
                        >
                          {project.name}
                        </h2>

                        <div className="relative  inline-block text-left" ref={(el) => (dropdownRefs.current[index] = el)}>
                        <button
                          className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <circle cx="4" cy="10" r="1.5" />
                            <circle cx="10" cy="10" r="1.5" />
                            <circle cx="16" cy="10" r="1.5" />
                          </svg>
                        </button>

                        {dropdownOpenIndex === index && (
                          <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50 ">
                            <ul className="py-1 text-sm text-gray-700">
                              <li
                                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                                onClick={() => {
                                  setMiddleView("chat");
                                  setDropdownOpenIndex(null);
                                }}
                              >
                                <FaComments className="text-blue-500" /> Chat
                              </li>
                              <li
                                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                                onClick={() => {
                                  setMiddleView("summary");
                                  setDropdownOpenIndex(null);
                                }}
                              >
                                <FaFileAlt className="text-green-500" /> Summarize
                              </li>
                              <li
                                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                                onClick={() => {
                                  setMiddleView("papers");
                                  setDropdownOpenIndex(null);
                                }}
                              >
                                <FaFilePdf className="text-red-500" /> Recommended Papers
                              </li>
                              <li
                                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                                onClick={() => {
                                  setMiddleView("grants");
                                  setDropdownOpenIndex(null);
                                }}
                              >
                                <FaMoneyCheckAlt className="text-purple-500" />Recommended Grants
                              </li>
                              <li
                                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                                onClick={() => {
                                  setMiddleView("conferences");
                                  setDropdownOpenIndex(null);
                                }}
                              >
                                <FaUniversity className="text-orange-500" />Recommended Conferences
                              </li>
                              <li
                                className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600 transition"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProject(e, project._id);
                                  setDropdownOpenIndex(null);
                                }}
                              >
                                <FaTrashAlt className="text-red-500" /> Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      </div>

                      {/* Dropdown animation container */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedProjectIndex === index ? "max-h-[40vh] overflow-y-scroll opacity-100 mt-1.5" : "max-h-0 opacity-0"
                        }`}
                      >
                        {/* Render Papers */}
                        {project.papers.map((paper, idx) => {
                          const isExpanded =
                            expandedPaper.projectIndex === index && expandedPaper.paperIndex === idx;
                          const topicsForThisPaper = getRandomTopics(2); // Get topics ONCE per paper

                          return (
                            <li
                              key={idx}
                              className={`py-0.5 flex flex-col ${
                                activePaper &&
                                activePaper.projectIndex === index &&
                                activePaper.paperIndex === idx
                                  ? "text-blue-700 font-bold"
                                  : ""
                              } hover:bg-gray-100 transition-all duration-300`}
                            >
                              <div className="flex justify-between items-center">
                                {/* Title */}
                                <ul className="ml-7 max-w-[80%] list-disc">
                                <li
                                  className="cursor-pointer whitespace-normal break-words"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePaperSelect(paper, index, idx);
                                  }}
                                >
                                  {paper.title || "Untitled Paper"}
                                </li>
                              </ul>
                                {/* Expand Button */}
                                <button
                                  className={`text-lg font-bold px-2 py-1 rounded transition-all ${
                                    isExpanded ? "text-blue-600" : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedPaper(
                                      isExpanded
                                        ? { projectIndex: null, paperIndex: null }
                                        : { projectIndex: index, paperIndex: idx }
                                    );
                                  }}
                                >
                                  {isExpanded ? "-" : "+"}
                                </button>
                              </div>

                              {/* Expanded Section */}
                              {isExpanded && (
                                <div className="mt-2 ml-10 text-sm text-gray-700 space-y-1">
                                  <p className="line-clamp-2 text-xs">{paper.summary || "No summary available."}</p>
                                  <p className="text-xs text-gray-500">Metadata: {paper.meta || "No metadata"}</p>

                                  {/* Topics below summary */}
                                  <div className="flex gap-2 text-xs text-blue-600 font-semibold mt-1">
                                    {topicsForThisPaper.map((topic, i) => (
                                      <span key={i}>{topic}</span>
                                    ))}
                                  </div>

                                  {/* Delete Button */}
                                  <button
                                    className="text-red-500 hover:text-red-700 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeletePaper(e, project._id, paper._id);
                                    }}
                                  >
                                    Delete Paper
                                  </button>
                                </div>
                              )}
                            </li>
                          );
                        })}

                        {/* Render .bib Entries */}
                        {project.bibEntries && project.bibEntries.length > 0 && (
                          <ul className="text-xs text-gray-600 list-disc pl-4">
                            {project.bibEntries.map((bibEntry, bibIdx) => {
                              const isExpanded =
                                expandedBibEntry.projectIndex === index &&
                                expandedBibEntry.bibIndex === bibIdx;

                              return (
                                <li
                                  key={bibIdx}
                                  className={`py-0.5 flex flex-col ${
                                    activeBibEntry &&
                                    activeBibEntry.projectIndex === index &&
                                    activeBibEntry.bibIndex === bibIdx
                                      ? "text-blue-700 font-bold"
                                      : ""
                                  } hover:bg-gray-100 transition-all duration-300`}
                                >
                                  <div className="flex justify-between items-center">
                                    {/* Title */}
                                    <div className="flex max-w-[85%] flex-col ml-3">
                                      <span
                                        className="cursor-pointer whitespace-normal break-words"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleBibEntrySelect(bibEntry, index, bibIdx);
                                        }}
                                      >
                                        <li>{bibEntry.entry?.entryTags?.title || "Untitled Bib Entry"}</li>
                                      </span>
                                    </div>

                                    {/* Expand Button */}
                                    <button
                                      className={`text-lg font-bold px-2 py-1 rounded transition-all ${
                                        isExpanded ? "text-blue-600" : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedBibEntry(
                                          isExpanded
                                            ? { projectIndex: null, bibIndex: null }
                                            : { projectIndex: index, bibIndex: bibIdx }
                                        );
                                      }}
                                    >
                                      {isExpanded ? "-" : "+"}
                                    </button>
                                  </div>

                                  {/* Expanded Section */}
                                  {isExpanded && (
                                    <div className="mt-2 ml-8 text-sm text-gray-700 space-y-1">
                                      <p className="line-clamp-2 text-xs">
                                        {bibEntry.entry?.entryTags?.abstract || "No abstract available."}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Year: {bibEntry.entry?.entryTags?.year || "Unknown"}
                                      </p>

                                      {/* Topics below summary */}
                                      <div className="flex gap-2 text-xs text-blue-600 font-semibold mt-1">
                                        {getRandomTopics(Math.floor(Math.random() * 2) + 1).map((topic, i) => (
                                          <span key={i}>{topic}</span>
                                        ))}
                                      </div>

                                      {/* Delete Button */}
                                      <button
                                        className="text-red-500 hover:text-red-700 text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteBibEntry(e, project._id, bibEntry._id);
                                        }}
                                      >
                                        Delete Paper
                                      </button>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {/* No Content Message */}
                        {(project.papers || []).length === 0 &&
                          (project.bibEntries || []).length === 0 && (
                            <p className="text-sm text-gray-500 italic mt-2">No papers available.</p>
                          )}
                      </div>
                    </li>
                  ))}
                  </ul>
                </div>
              )}
            </ul>
            {selectedProjectIndex !== null && !showPaperOptions && (
              <div className="mt-3">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors text-sm flex items-center justify-center gap-2"
                  onClick={() => setShowPaperOptions(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Papers
                </button>
              </div>
            )}
            {showPaperOptions && selectedProjectIndex !== null && (
              <div className="space-y-4 mt-3 bg-white p-3 rounded-lg shadow-md border border-blue-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-blue-700">Add Papers</h3>
                  <button
                    onClick={() => setShowPaperOptions(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-blue-700 font-medium mb-1">
                    Add paper URL
                  </label>
                  <div className="flex gap-1 mb-3">
                    <input
                      className="flex-1 bg-gray-50 text-gray-800 rounded-md p-2 border border-blue-300 focus:border-blue-500 focus:outline-none text-xs"
                      placeholder="https://arxiv.org/abs/xxx"
                      value={paperUrl}
                      onChange={(e) => setPaperUrl(e.target.value)}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      onClick={handleAddPaperByUrl}
                    >
                      Add
                    </button>
                  </div>
                  <div className="mb-3">
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        isDragging
                          ? "border-blue-500 bg-blue-100"
                          : "border-blue-300 hover:border-blue-500"
                      } transition-colors cursor-pointer`}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      onClick={openFileSelector}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm mb-1 text-blue-700 font-medium">
                          {isDragging
                            ? "Drop files here"
                            : "Drag & drop papers or click to upload"}
                        </p>
                        <p className="text-xs text-blue-500">
                          PDF, DOC, DOCX, TXT, BibTeX files supported
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileSelect}
                      />
                    </div>
                    {(droppedFiles.length > 0 || selectedFiles.length > 0) && (
                      <div className="mt-2 bg-gray-100 rounded-md p-2">
                        <div className="text-xs text-blue-700 font-medium mb-1">
                          {droppedFiles.length + selectedFiles.length} file(s) ready to
                          upload:
                        </div>
                        <ul className="max-h-20 overflow-y-auto mb-2 text-xs text-gray-700">
                          {[...droppedFiles, ...selectedFiles].map((file, idx) => (
                            <li key={idx} className="truncate">
                              • {file.name}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={handleUploadFiles}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md font-medium text-xs flex items-center justify-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Upload Files
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center justify-between w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md transition-colors text-xs"
              onClick={() => setShowProfileOptions((prev) => !prev)}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{userName}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showProfileOptions && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-md shadow-lg border border-blue-200 overflow-hidden z-10">
                <button
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-800 hover:bg-blue-100 transition-colors text-left"
                  onClick={handleProfileClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-blue-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-800 hover:bg-blue-100 transition-colors text-left"
                  onClick={() => {
                    setShowProfileOptions(false);
                    handleLogout();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Middle Content - Increased width */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex-1 flex flex-col p-3 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
            {activePaper ? (
                <div className="bg-white rounded-md p-6 max-w-3xl mx-auto shadow-lg border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                  {activePaper.name || "Untitled Paper"}
                </h2>
               
                <div className="border-b border-blue-100 pb-2 mb-4">
                  <p className="text-sm text-gray-700">
                    From project:{" "}
                    <span className="text-blue-600">
                      {projects[activePaper.projectIndex]?.name || "Unknown Project"}
                    </span>
                  </p>
                   {activePaper.url && (
                    <p className="text-blue-600 underline break-all">
                      <a href={activePaper.url} target="_blank" rel="noopener noreferrer">
                      {activePaper.url}
                      </a>
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {activePaper.name.toLowerCase().endsWith(".docx") ||
                    activePaper.name.toLowerCase().endsWith(".doc")
                      ? "Word Document"
                      : activePaper.name.toLowerCase().endsWith(".pdf")
                      ? "PDF Document"
                      : activePaper.name.toLowerCase().endsWith(".txt")
                      ? "Text Document"
                      : "Document"}
                  </p>
                </div>
                
                
                <div className="mt-3 p-4 bg-gray-50 rounded-md border border-blue-50">
                  {(activePaper.name.toLowerCase().endsWith(".docx") ||
                    activePaper.name.toLowerCase().endsWith(".doc")) && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-blue-500 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="text-blue-700 text-lg font-medium mb-2">
                        {activePaper.name || "Untitled Paper"}
                      </h3>
                      <p className="text-gray-600 text-center max-w-md">
                        Word document preview is available. In a production environment,
                        this would render the document content using appropriate libraries.
                      </p>
                      <button
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={() => {
                        const confirmOpen = confirm(`Open document: ${activePaper.name}?`);
                        if (confirmOpen) {
                          window.open(activePaper.url, "_blank");
                        }
                      }}
                    >
                      Open document
                    </button>

                    </div>
                  )}
                  {activePaper.name.toLowerCase().endsWith(".pdf") && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-500 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="text-red-600 text-lg font-medium mb-2">
                        {activePaper.name || "Untitled Paper"}
                      </h3>
                      <p className="text-gray-600 text-center max-w-md">
                        PDF preview is available. In a production environment, this would
                        render the PDF content using appropriate libraries.
                      </p>
                      <button
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={() => {
                          const confirmOpen = confirm(`Open PDF: ${activePaper.name} ?`);
                          if (confirmOpen) {
                            window.open(activePaper.url, "_blank");
                          }
                        }}
                      >
                        Open PDF
                      </button>
                    </div>
                  )}
                  {!activePaper.name.toLowerCase().endsWith(".docx") &&
                    !activePaper.name.toLowerCase().endsWith(".doc") &&
                    !activePaper.name.toLowerCase().endsWith(".pdf") && (
                      <div>
                        <p className="text-gray-700 mb-3">
                          Paper content would display here
                        </p>
                        <p className="text-sm text-gray-500">
                          This is a simulated view of the paper content. In a real
                          application, the paper would be rendered here with full formatting
                          and navigation options.
                        </p>
                      </div>
                    )}
                  <div>
                  <div>
                    <h1 className="text-blue-700 font-medium mb-2">Abstract:</h1>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {activePaper.abstract || 'No abstract available.'}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="text-blue-700 mt-4 font-medium mb-2">Keywords:</h1>
                  {Array.isArray(activePaper.keywords) && activePaper.keywords.length > 0 ? (
                    <section>
                    <div className="flex flex-wrap gap-2">
                      {activePaper.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </section>
                  ) : (
                    <p className="text-sm text-gray-700 whitespace-pre-line" >No keywords available.</p>
                  )}
                </div>

                </div>
                
              </div>
              ) : activeBibEntry ? (
                <div className="bg-white rounded-md p-6 max-w-3xl mx-auto shadow-lg border border-blue-100">
                  {/* Bib Entry Details */}
                  <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    {activeBibEntry.fields?.title || "Untitled Bib Entry"}
                  </h2>
                  <div className="border-b border-blue-100 pb-2 mb-4">
                    <p className="text-sm text-gray-700">
                      From project:{" "}
                      <span className="text-blue-600">
                        {projects[activeBibEntry.projectIndex]?.name || "Unknown Project"}
                      </span>
                    </p>
                    {activeBibEntry.fields?.doi && (
                      <div className="flex">
                      <span>DOI: </span>
                      <p className="text-blue-600 underline break-all">
                       
                        <a href={`https://doi.org/${activeBibEntry.fields.doi}`|| '#'} target="_blank" rel="noopener noreferrer">
                          {activeBibEntry.fields.doi}
                        </a>
                      </p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Bib Entry</p>
                  </div>
                  <div className="mt-3 p-4 bg-gray-50 rounded-md border border-blue-50">
                    <p className="text-gray-700 mb-3">Bib entry content would display here</p>
                    <p className="text-sm text-gray-500">
                      This is a simulated view of the bib entry content. In a real application, the bib
                      entry would be rendered here with full formatting and navigation options.
                    </p>
                    <div className="mt-6 border-t border-blue-100 pt-4">
                      <h3 className="text-blue-700 font-medium mb-2">Metadata</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>
                          • <strong>Authors:</strong>{" "}
                          {activeBibEntry.fields?.author || "Unknown Author"}
                        </li>
                        <li>
                          • <strong>Year:</strong>{" "}
                          {activeBibEntry.fields?.year || "Unknown Year"}
                        </li>
                        <li>
                          • <strong>Citation Key:</strong>{" "}
                          {activeBibEntry.citationKey || "Unknown"}
                        </li>
                        <li>
                          • <strong>Type:</strong>{" "}
                          {activeBibEntry.entryType || "Unknown Type"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : selectedProjectIndex !== null && !activePaper ? (
                <div className="max-w-4xl mx-auto">
                {middleView === "default" || middleView === "papers" ? (
                  <>
                    <div className="text-center mt-8">
                      <h2 className="text-xl font-bold mb-3 bg-blue-50 py-2 px-4 rounded-md inline-block text-blue-700">
                        {projects[selectedProjectIndex].name}
                      </h2>
                      <p className="text-sm text-gray-600">{projects[selectedProjectIndex].papers.length} papers added</p>
                    </div>
            
                    {/* Display Arxiv papers */}
                    <h3 className="text-blue-700 font-medium text-md mt-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      Recommended Papers
                    </h3>
                    <div className="space-y-5 overflow-y-scroll max-h-[60vh] mt-2">
                      {papers.map((paper, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                          <a href={paper.link} target="_blank" rel="noopener noreferrer" className="inline-block text-gray-800 hover:text-blue-700 font-medium text-xl">
                            {paper.title}
                          </a>
                          <p className="text-sm text-gray-600 mt-2">Authors: {paper.authors.join(", ") || "Unknown"}</p>
                          <p className="text-sm text-gray-500 mt-1">Published: {new Date(paper.publishedDate).toLocaleDateString()}</p>
                          <p className="text-gray-700 text-sm mt-3">{paper.summary}</p>
                          <button
                            onClick={() => addPaperToProject(paper)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                          >
                            Add to Project
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : middleView === "summary" ? (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-blue-700">Summary: {projects[selectedProjectIndex].name}</h2>
                    <p className="text-gray-600 mb-4">Displaying summary of all papers in this project.</p>
                    <ul className="space-y-3">
                      {projects[selectedProjectIndex]?.papers.map((paper, idx) => (
                        <li key={idx} className="bg-white p-4 rounded shadow-sm border border-blue-100">
                          <h3 className="font-semibold text-gray-800">{paper.title || "Untitled Paper"}</h3>
                          <p className="text-sm text-gray-500 mt-1">No detailed summary available yet.</p>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : middleView === "chat" ? (
                <div className="text-center mt-8">
                <p className="text-sm text-gray-700">Welcome to Re-Assist.</p>
                <p className="mt-2 text-sm text-gray-600">Select or create a project to get started.</p>
                {/* Paper recommendations for new users */}
                <div className="mt-8 max-w-lg mx-auto bg-white rounded-lg p-4 shadow-md border border-blue-100">
                  <h3 className="text-blue-700 font-medium text-sm mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Trending Papers
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.map((rec, idx) => (
                      <li key={idx} className="bg-gray-50 p-2 rounded text-sm hover:bg-blue-50 transition-colors cursor-pointer text-gray-700">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-3 w-[50%] border-t border-blue-100 pt-3">
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-white text-gray-800 p-2 rounded-md border border-blue-200 focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md transition-colors text-white"
                    onClick={handleSendMessage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
  
                
              </div>
              </div>
                ) :middleView === "grants" ? (
                  <div className="py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-indigo-700">Recommended Grants</h2>
                      <div className="text-sm text-gray-500">Showing {grants.length} results</div>
                    </div>
                    
                    <div className="mb-6">
                      <input
                        type="text"
                        placeholder="Search grants..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                      {grants.map((grant, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                        >
                          <div className="p-5">
                            <div className="mb-2">
                              <h3 className="text-lg font-semibold text-indigo-600">{grant.name}</h3>
                              <p className="text-sm text-gray-500">{grant.type}</p>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                              <p className="text-sm text-gray-700">Deadline: {grant.deadline}</p>
                              <p className="text-lg font-bold text-indigo-700">{grant.amount}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-1 rounded-md text-sm">
                                View Details
                              </button>
                              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                                Track
                              </button>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : middleView === "conferences" ? (
                  <div className="py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-indigo-700">Recommended Conferences</h2>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                      {conferences.map((conf, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                        >
                          <div className="p-5">
                            <h3 className="text-lg font-semibold text-indigo-600 mb-2">{conf.name}</h3>
                            <p className="text-sm text-gray-700 mb-1">{conf.date}</p>
                            <p className="text-sm text-indigo-500 mb-3">{conf.location}</p>
                            <div className="flex justify-between items-center">
                              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-sm">
                                {conf.tag}
                              </span>
                              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                                Track
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
                ) : (
                  <div className="text-center mt-8">
                    <p className="text-sm text-gray-700">Welcome to Re-Assist.</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Select or create a project to get started.
                    </p>
                    {/* Paper recommendations for new users */}
                    <div className="mt-8 max-w-lg mx-auto bg-white rounded-lg p-4 shadow-md border border-blue-100">
                      <h3 className="text-blue-700 font-medium text-sm mb-3 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        Trending Papers
                      </h3>
                      <ul className="space-y-2">
                        {recommendations.map((rec, idx) => (
                          <li
                            key={idx}
                            className="bg-gray-50 p-2 rounded text-sm hover:bg-blue-50 transition-colors cursor-pointer text-gray-700"
                          >
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
  
            
            </div>
          </div>
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmDelete}
            message={confirmationMessage}
          />
        </div>
      </div>
    );
  }