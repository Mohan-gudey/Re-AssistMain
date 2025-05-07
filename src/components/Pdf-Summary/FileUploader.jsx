// src/components/FileUploader.jsx
import React, { useRef } from 'react';
import { extractTextFromPDF, analyzeWithGroq, extractAbstract, extractKeywords } from './utils/extractors';

const FileUploader = ({ setAbstract, setKeywords, setRawText, setLoading }) => {
  const fileInputRef = useRef();

  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await extractTextFromPDF(file);
      setRawText(text);

      // Use AI extraction if enabled
      const useAI = true; // You can add toggle in SettingsPanel later
      let abs, kws;

      if (useAI) {
        const result = await analyzeWithGroq(text);
        abs = result.abstract;
        kws = result.keywords;
      } else {
        abs = extractAbstract(text);
        kws = extractKeywords(text, abs.text);
      }

      setAbstract(abs);
      setKeywords(kws.list || []);
    } catch (err) {
      alert('Error processing file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleUpload} className="mb-4" />
      <br />
    </div>
  );
};

export default FileUploader;