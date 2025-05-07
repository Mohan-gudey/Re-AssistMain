// src/components/SettingsPanel.jsx
import React, { useState } from 'react';

const SettingsPanel = () => {
  const [scanPages, setScanPages] = useState(0);
  const [mode, setMode] = useState('ai');
  const [skipAffiliations, setSkipAffiliations] = useState(true);

  return (
    <details className="mb-6 bg-white shadow p-4 rounded">
      <summary className="font-medium cursor-pointer">Advanced Options</summary>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block mb-2">Minimum Pages to Scan:</label>
          <select
            value={scanPages}
            onChange={(e) => setScanPages(e.target.value)}
            className="border rounded p-2"
          >
            <option value="5">First 5 pages</option>
            <option value="10">First 10 pages</option>
            <option value="15">First 15 pages</option>
            <option value="0">All pages</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Processing Mode:</label>
          <label className="mr-4">
            <input
              type="radio"
              name="mode"
              value="ai"
              checked={mode === 'ai'}
              onChange={() => setMode('ai')}
            />{' '}
            AI-powered
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="standard"
              checked={mode === 'standard'}
              onChange={() => setMode('standard')}
            />{' '}
            Standard
          </label>
        </div>
        <div className="flex items-center">
          <label className="mr-4">Skip Author Affiliations:</label>
          <input
            type="checkbox"
            checked={skipAffiliations}
            onChange={() => setSkipAffiliations(!skipAffiliations)}
          />
        </div>
      </div>
    </details>
  );
};

export default SettingsPanel;