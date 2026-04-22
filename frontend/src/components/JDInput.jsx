import React from 'react';

const JDInput = ({ jd, setJd }) => {
  return (
    <div className="space-y-3">
      <label htmlFor="jd" className="block text-sm font-medium text-slate-700">
        Paste the Job Description here
      </label>
      <textarea
        id="jd"
        rows={6}
        className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border resize-y bg-slate-50 transition-colors hover:bg-white"
        placeholder="e.g. We are looking for a Senior React Developer with experience in Node.js..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
      <p className="text-xs text-slate-500">
        We'll extract key skills and optimize your resume based on this description.
      </p>
    </div>
  );
};

export default JDInput;
