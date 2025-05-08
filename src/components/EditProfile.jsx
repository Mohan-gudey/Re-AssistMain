import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function EditProfile({ onSave, initialProfile = {} }) {
  const [name, setName] = useState(initialProfile?.name || "");
  const [institution, setInstitution] = useState(initialProfile?.institution || "");
  const [designation, setDesignation] = useState(initialProfile?.position || "");
  const [customInterest, setCustomInterest] = useState('');
  const [newInterest, setNewInterest] = useState("");
  const [interests, setInterests] = useState(initialProfile?.researchInterests || []);
  const [papers, setPapers] = useState(initialProfile?.publications || []);
  const [newPaper, setNewPaper] = useState({ title: "", journal: "", year: "", authors: "", file: null });
  const [email, setEmail] = useState(initialProfile?.email || "");
  const navigate = useNavigate();

  const predefinedInterests = [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Robotics",
    "Natural Language Processing",
    "Computer Vision",
    "Blockchain",
    "IoT",
    "Cybersecurity",
  ];

  const handleAddInterest = (interest) => {
    if (interest && interests.length < 10 && !interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter((i) => i !== interestToRemove));
  };

  const handleAddPaper = () => {
    if (newPaper.title && newPaper.journal && newPaper.year && newPaper.file) {
      setPapers([...papers, newPaper]);
      setNewPaper({ title: "", journal: "", year: "", authors: "", file: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPaper({ ...newPaper, file });
    }
  };

  const handleSave = () => {
    const firebaseId = localStorage.getItem('firebaseId');
    const token = localStorage.getItem('token');
  
    const formData = new FormData();
  
    formData.append('firebaseId', firebaseId);
    formData.append('fullName', name);
    formData.append('institution', institution);
    formData.append('position', designation);
    formData.append('researchInterests', JSON.stringify(interests));
  
    const publicationData = papers.map(paper => ({
      title: paper.title,
      journal: paper.journal,
      year: paper.year,
      authors: paper.authors || '',
    }));
  
    formData.append('publications', JSON.stringify(publicationData));
  
    // Append each file individually
    papers.forEach((paper) => {
      if (paper.file) {
        formData.append('papers', paper.file);
      }
    });
  
    axios
      .put('https://re-assist-backend.onrender.com/api/profiles/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this is correct
        },
      })
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
        if (onSave) onSave(response.data);
        navigate('/profile');
      })
      .catch((error) => {
        console.error(
          'Error updating profile:',
          error.response?.data || error.message
        );
      });
  };
  
  
  // Filter predefined interests based on the input
  const filteredInterests = predefinedInterests.filter((interest) =>
    interest.toLowerCase().includes(newInterest.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-md shadow-sm space-y-6">
      <h2 className="text-lg font-semibold text-blue-700">Edit Profile</h2>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-2 py-1 rounded" />

        <label className="block text-sm text-gray-700">Institution</label>
        <input value={institution} onChange={(e) => setInstitution(e.target.value)} className="w-full border px-2 py-1 rounded" />

        <label className="block text-sm text-gray-700">Designation</label>
        <select value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full border px-2 py-1 rounded">
          <option value="">Select</option>
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Researcher">Researcher</option>
        </select>
      </div>

      {/* Research Interests Section */}
      <div>
        <label className="block text-sm text-gray-700 mb-1">Research Interests</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            placeholder="Start typing to select or add an interest"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
          />
          <button
            onClick={() => {
              const interestToAdd = customInterest || newInterest;
              handleAddInterest(interestToAdd);
              setCustomInterest('');
              setNewInterest('');
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>

        {/* Filtered interests suggestions */}
        {newInterest && filteredInterests.length > 0 && (
          <div className="bg-white border p-2 rounded shadow-md">
            {filteredInterests.map((interest, idx) => (
              <div
                key={idx}
                className="py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => handleAddInterest(interest)}
              >
                {interest}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-2">
          {interests.map((int, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
            >
              {int}
              <button
                onClick={() => handleRemoveInterest(int)}
                className="text-red-500 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Publications Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">Upload Papers</h3>

        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setPapers((prev) => [...prev, ...files.map((file) => ({ file }))]);
          }}
          className="border px-2 py-1 rounded"
        />

        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          {papers.map((paper, idx) => (
            <li key={idx}>
              • {paper.file?.name}{" "}
              {paper.file && (
                <a
                  href={URL.createObjectURL(paper.file)}
                  download={paper.file.name}
                  className="text-blue-600 ml-2"
                >
                  Download
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSave} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
}