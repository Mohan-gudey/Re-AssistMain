// import React from 'react';

// const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//         <p className="text-lg font-medium mb-4">{message}</p>
//         <div className="flex justify-center space-x-4">
//           <button
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             onClick={onConfirm}
//           >
//             Delete
//           </button>
//           <button
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationModal;

import React, { useState } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  const [inputValue, setInputValue] = useState(''); // State to track the user's input

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-medium mb-4">{message}</p>
        <p className="text-sm text-gray-600 mb-4">
          Type <strong>DELETE</strong> below to confirm deletion:
        </p>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter DELETE"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              inputValue === 'DELETE'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={inputValue === 'DELETE' ? onConfirm : undefined} // Enable button only if input matches
            disabled={inputValue !== 'DELETE'} // Disable button if input doesn't match
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;