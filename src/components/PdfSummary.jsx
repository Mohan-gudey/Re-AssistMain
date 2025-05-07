import React, { useState } from 'react';
import FileUploader from './Pdf-Summary/FileUploader';
import ResultsDisplay from './Pdf-Summary/ResultsDisplay';

const PdfSummary = () => {
  const [abstract, setAbstract] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 border-b pb-2 mb-6">
        Research Paper Extractor
      </h1>
      <FileUploader
        setAbstract={setAbstract}
        setKeywords={setKeywords}
        setRawText={setRawText}
        setLoading={setLoading}
      />
      {loading && <p className="text-blue-500 mt-4 italic">Processing PDF...</p>}
      {(abstract || keywords.length > 0) && (
        <ResultsDisplay abstract={abstract} keywords={keywords} rawText={rawText} />
      )}
    </div>
  );
};

export default PdfSummary;
