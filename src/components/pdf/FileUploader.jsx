// // src/components/FileUploader.jsx
// import React, { useRef } from 'react';
// import { extractTextFromPDF, analyzeWithGroq, extractAbstract, extractKeywords } from '../utils/extractors';

// const FileUploader = ({ setAbstract, setKeywords, setRawText, setLoading }) => {
//   const fileInputRef = useRef();

//   const handleUpload = async () => {
//     const file = fileInputRef.current.files[0];
//     if (!file) return;

//     setLoading(true);
//     try {
//       const text = await extractTextFromPDF(file);
//       setRawText(text);

//       // Use AI extraction if enabled
//       const useAI = true; // You can add toggle in SettingsPanel later
//       let abs, kws;

//       if (useAI) {
//         const result = await analyzeWithGroq(text);
//         abs = result.abstract;
//         kws = result.keywords;
//       } else {
//         abs = extractAbstract(text);
//         kws = extractKeywords(text, abs.text);
//       }

//       setAbstract(abs);
//       setKeywords(kws.list || []);
//     } catch (err) {
//       alert('Error processing file');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleUpload} className="mb-4" />
//       <br />
//     </div>
//   );
// };

// export default FileUploader;

// import React from 'react';
// import { extractTextFromFile } from '../utils/fileUtils';
// import { analyzeWithGroq } from '../utils/aiUtils'; // ✅ Add this import

// function FileUploader({ setAbstract, setKeywords, setRawText, setLoading }) {
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     try {
//       const text = await extractTextFromFile(file);
//       setRawText(text);

//       // Analyze with AI
//       const { abstract, keywords } = await analyzeWithGroq(text); // ✅ Now works
//       console.log("AI Response:", { abstract, keywords });
//       setAbstract(abstract);
//       setKeywords(keywords.list);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to process file');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <input
//         type="file"
//         accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
//         onChange={handleFileUpload}
//         className="block w-full text-sm text-gray-500
//           file:mr-4 file:py-2 file:px-4
//           file:rounded file:border-0
//           file:text-sm file:font-semibold
//           file:bg-blue-50 file:text-blue-700
//           hover:file:bg-blue-100"
//       />
//     </div>
//   );
// }

// export default FileUploader;

import React from 'react';
import { extractTextFromFile, analyzeWithGroq } from './utils/aiUtils'; // ✅ Single import path if both are in same file

function FileUploader({ setAbstract, setKeywords, setRawText, setLoading }) {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Validate file type
    const fileName = file.name.toLowerCase();
    const allowedTypes = [
      '.pdf',
      '.docx',
      '.doc',
      '.txt',
      '.rtf',
      '.odt',
      '.md',
    ];
    const fileExt = fileName.slice(fileName.lastIndexOf('.'));
    if (!allowedTypes.includes(fileExt)) {
      // alert(`Unsupported file type: ${fileExt}. Please upload a valid document.`);
      return;
    }

    setLoading(true);
    try {
      const text = await extractTextFromFile(file);
      setRawText(text);

      // Analyze with AI
      const { abstract, keywords } = await analyzeWithGroq(text);
      console.log('AI Response:', { abstract, keywords });
      setAbstract(abstract);
      setKeywords(keywords.list || []);
    } catch (err) {
      console.error('Processing error:', err);
      alert('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Research Paper
      </label>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.md"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
}

export default FileUploader;