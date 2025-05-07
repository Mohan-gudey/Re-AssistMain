// // src/components/ResultsDisplay.jsx
// import React from 'react';

// const ResultsDisplay = ({ abstract, keywords, rawText, debugMode }) => {
//   if (!abstract && keywords.length === 0) return null;

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4 mt-6">
//       <h2 className="text-xl font-semibold mb-2">Abstract</h2>
//       <div className="bg-gray-100 p-4 rounded border-l-4 border-blue-500 whitespace-pre-wrap">
//         {abstract?.text || 'Not found'}
//       </div>

//       <h2 className="text-xl font-semibold mt-6 mb-2">Keywords</h2>
//       <div className="flex flex-wrap gap-2">
//         {keywords.map((keyword, i) => (
//           <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//             {keyword}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ResultsDisplay;

import React from 'react';

function ResultsDisplay({ abstract, keywords, rawText }) {
  return (
    <div className="w-full max-w-3xl mt-8 bg-white shadow-md rounded-lg p-6 space-y-6">
      {/* Abstract Section */}
      {abstract?.text && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Abstract</h2>
          <p className="text-gray-700 whitespace-pre-line">{abstract.text}</p>
        </section>
      )}

      {/* Keywords Section */}
      {Array.isArray(keywords) && keywords.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Optional: Raw Text Preview */}
      {/* <pre className="text-sm text-gray-600 overflow-x-auto">{rawText}</pre> */}
    </div>
  );
}

export default ResultsDisplay;